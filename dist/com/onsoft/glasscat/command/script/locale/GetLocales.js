"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const AbstractScriptCommand_1 = require("../../core/AbstractScriptCommand");
const CommandDescriptorBuilder_1 = require("../../util/CommandDescriptorBuilder");
class GetLocales extends AbstractScriptCommand_1.AbstractScriptCommand {
    constructor() {
        super();
    }
    execute(argv, callback) {
        fs.readdir("./public/locales", (err, files) => {
            if (err) {
                callback(null, err);
            }
            else {
                const result = new Array();
                let locale = null;
                files.forEach((value) => {
                    locale = value.substring(0, value.length - 5);
                    result.push(locale);
                });
                callback(result);
            }
        });
    }
    getHelp(argv) {
        const commBuilder = new CommandDescriptorBuilder_1.CommandDescriptorBuilder();
        const descriptor = commBuilder.build("$glasscat create-role", "Returns the list of all available locales for a GlassCat server instance.");
        return descriptor;
    }
}
exports.GetLocales = GetLocales;
