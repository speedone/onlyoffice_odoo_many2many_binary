{
    "name": "ONLYOFFICE Many2Many Binary",
    "version": "18.0.1.0.0",
    "author": "RRDS",
    "website": "https://www.rrds.de",
    "summary": "Edit office files in many2many_binary fields with ONLYOFFICE",
    "category": "Productivity",
    "license": "LGPL-3",
    "description": """
        This module extends the many2many_binary widget to support ONLYOFFICE editing.
        It adds an edit button to files displayed in many2many_binary fields,
        allowing direct editing with ONLYOFFICE Docs.
    """,
    "data": [],
    "depends": ["onlyoffice_odoo", "web"],
    "installable": True,
    "assets": {
        "web.assets_backend": [
            "onlyoffice_odoo_many2many_binary/static/src/models/*.js",
            "onlyoffice_odoo_many2many_binary/static/src/components/*/*.xml",
        ],
    },
}
