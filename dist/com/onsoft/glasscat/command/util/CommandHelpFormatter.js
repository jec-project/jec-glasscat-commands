"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
class CommandHelpFormatter {
    constructor() { }
    format(command) {
        const params = command.parameters;
        let msg = chalk_1.default.blue(`\ncommand: ${command.name}`) +
            `\n         ${command.description}`;
        let type = null;
        if (params) {
            msg += "\n";
            params.forEach((desc) => {
                type = desc.type;
                msg += chalk_1.default.blue(`\n       --${desc.name}`);
                if (type)
                    msg += chalk_1.default.green(`\n         type: ${type}`);
                if (desc.required)
                    msg += chalk_1.default.green(" - ") + chalk_1.default.red("required");
                msg += `\n         ${desc.description}`;
            });
        }
        return msg;
    }
}
exports.CommandHelpFormatter = CommandHelpFormatter;
