# ONLYOFFICE Many2Many Binary Integration

## Beschreibung

Dieses Modul erweitert das `many2many_binary` Widget in Odoo 18, um die direkte Bearbeitung von Office-Dateien mit ONLYOFFICE Docs zu ermöglichen.

## Features

- ✅ Fügt einen "Edit in ONLYOFFICE" Button zu allen Dateien in `many2many_binary` Feldern hinzu
- ✅ Unterstützt alle von ONLYOFFICE unterstützten Formate (DOCX, XLSX, PPTX, PDF, etc.)
- ✅ Nutzt die bestehende ONLYOFFICE Infrastruktur
- ✅ Funktioniert mit allen `many2many_binary` Feldern in Odoo

## Abhängigkeiten

- `onlyoffice_odoo` - Basis ONLYOFFICE Integration
- `web` - Odoo Web Framework

## Installation

1. Stelle sicher, dass `onlyoffice_odoo` installiert und konfiguriert ist
2. Kopiere dieses Modul in dein Addons-Verzeichnis
3. Aktualisiere die Modulliste in Odoo
4. Installiere das Modul "ONLYOFFICE Many2Many Binary"

## Verwendung

Nach der Installation wird automatisch bei allen `many2many_binary` Feldern ein ONLYOFFICE Edit-Button angezeigt, wenn die Datei ein unterstütztes Format hat.

Beispiel:
```xml
<field name="attachment_ids" widget="many2many_binary"/>
```

## Unterstützte Formate

### Editierbare Formate
- DOCX, XLSX, PPTX, PDF

### Viewable Formate
- DOC, DOCM, DOT, DOTX, ODT, RTF, TXT
- XLS, XLSM, XLT, XLTX, ODS, CSV
- PPT, PPTM, POT, POTX, ODP, PPS, PPSX
- und viele mehr...

## Technische Details

Das Modul patcht die `Many2ManyBinaryField` Komponente und fügt:
- Eine `onlyofficeCanOpen()` Methode zur Prüfung der Dateikompatibilität hinzu
- Eine `openOnlyoffice()` Methode zum Öffnen des ONLYOFFICE Editors
- Ein Template-Erweiterung für den Edit-Button

## Lizenz

LGPL-3

## Support

Bei Fragen oder Problemen wende dich an: RRDS (https://www.rrds.de)
