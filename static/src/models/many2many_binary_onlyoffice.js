/** @odoo-module **/

/*
 * ONLYOFFICE Integration for Many2Many Binary Fields
 * (c) 2024 RRDS
 */

import { Many2ManyBinaryField } from "@web/views/fields/many2many_binary/many2many_binary_field";
import { _t } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";
import { patch } from "@web/core/utils/patch";

// Supported file formats from onlyoffice_odoo
const oo_editable_formats = ["docx", "xlsx", "pptx", "pdf"];

const oo_viewable_formats = [
    "djvu", "doc", "docm", "docxf", "dot", "dotm", "dotx", "epub", "fb2",
    "fodt", "html", "mht", "odt", "ott", "oxps", "rtf", "txt", "xps", "xml",
    "csv", "fods", "ods", "ots", "xls", "xlsb", "xlsm", "xlt", "xltm", "xltx",
    "fodp", "odp", "otp", "pot", "potm", "potx", "pps", "ppsm", "ppsx", "ppt", "pptm"
];

patch(Many2ManyBinaryField.prototype, {
    setup() {
        super.setup(...arguments);
        this.orm = useService("orm");
        this.notification = useService("notification");
        this.actionService = useService("action");
    },

    /**
     * Check if file can be opened in ONLYOFFICE
     * @param {Object} file - File object with name and extension
     * @returns {boolean}
     */
    onlyofficeCanOpen(file) {
        const extension = this.getExtension(file).toLowerCase();
        return (
            oo_editable_formats.includes(extension) ||
            oo_viewable_formats.includes(extension)
        );
    },

    /**
     * Open file in ONLYOFFICE editor
     * @param {Object} file - File object with id
     */
    async openOnlyoffice(file) {
        // Check demo mode and expiration (same logic as AttachmentList)
        const demo = JSON.parse(await this.orm.call("onlyoffice.odoo", "get_demo"));
        if (demo && demo.mode && demo.date) {
            const isValidDate = (d) => d instanceof Date && !isNaN(d);
            demo.date = new Date(Date.parse(demo.date));
            if (isValidDate(demo.date)) {
                const today = new Date();
                const difference = Math.floor((today - demo.date) / (1000 * 60 * 60 * 24));
                if (difference > 30) {
                    this.notification.add(
                        _t("The 30-day test period is over, you can no longer connect to demo ONLYOFFICE Docs server"),
                        {
                            title: _t("ONLYOFFICE Docs server"),
                            type: "warning",
                        }
                    );
                    return;
                }
            }
        }

        // Check if should open in same tab or new tab
        const { same_tab } = JSON.parse(await this.orm.call("onlyoffice.odoo", "get_same_tab"));
        if (same_tab) {
            const action = {
                params: { attachment_id: file.id },
                tag: "onlyoffice_editor",
                target: "current",
                type: "ir.actions.client",
            };
            return this.actionService.doAction(action);
        }

        // Open in new tab
        window.open(`/onlyoffice/editor/${file.id}`, "_blank");
    },
});
