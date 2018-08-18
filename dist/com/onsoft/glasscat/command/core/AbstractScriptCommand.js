"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AbstractScriptCommand {
    constructor() {
        this.__logger = null;
    }
    execute(argv, callback) { }
    setLogger(logger) {
        this.__logger = logger;
    }
    getHelp(argv) {
        return null;
    }
}
exports.AbstractScriptCommand = AbstractScriptCommand;
