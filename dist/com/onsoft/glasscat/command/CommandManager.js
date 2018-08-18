"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_commons_1 = require("jec-commons");
const jec_glasscat_core_1 = require("jec-glasscat-core");
const minimist = require("minimist");
const CommandHelpFormatter_1 = require("./util/CommandHelpFormatter");
const GlassCatCommandError_1 = require("./exception/GlassCatCommandError");
class CommandManager {
    constructor() {
        this._logger = null;
        if (CommandManager._locked || CommandManager.INSTANCE) {
            throw new jec_commons_1.SingletonError(CommandManager);
        }
        else {
            CommandManager._locked = true;
            const manager = jec_glasscat_core_1.LoggerManager.getInstance();
            this._logger = manager.isInitialized() ? manager : new jec_commons_1.ConsoleLogger();
        }
    }
    static getInstance() {
        if (CommandManager.INSTANCE === null) {
            CommandManager._locked = false;
            CommandManager.INSTANCE = new CommandManager();
        }
        return CommandManager.INSTANCE;
    }
    execute(command, callback) {
        const argv = process.argv.splice(2);
        const name = command.constructor.name;
        const args = minimist(argv);
        const help = args.help || args.h || null;
        let formater = null;
        let commandDescriptor = null;
        let msg = "running command: name='" +
            name + "', arguments='" + argv + "'";
        this._logger.info(msg, CommandManager.LOG_CONTEXT);
        command.setLogger(this._logger);
        if (help) {
            msg = "running command help: '" + help + "'";
            this._logger.info(msg, CommandManager.LOG_CONTEXT);
            commandDescriptor = command.getHelp(help);
            if (commandDescriptor) {
                formater = new CommandHelpFormatter_1.CommandHelpFormatter();
                console.log(formater.format(commandDescriptor));
            }
            else {
                console.log("No help information is available for this command.");
            }
            if (callback) {
                msg = "callback is not allowed for help commands";
                this._logger.warn(msg, CommandManager.LOG_CONTEXT);
            }
        }
        else {
            command.execute(args, (err) => {
                if (err) {
                    msg = "command error: name='" + name + "', error='" + err + "'";
                    this._logger.error(msg, CommandManager.LOG_CONTEXT);
                    const error = new GlassCatCommandError_1.GlassCatCommandError(msg, err.stack || err.toString());
                    if (callback) {
                        callback(error);
                    }
                    else {
                        throw error;
                    }
                }
                else {
                    msg = "command success: name='" + name + "'";
                    this._logger.info(msg, CommandManager.LOG_CONTEXT);
                    if (callback)
                        callback(null);
                }
            });
        }
    }
}
CommandManager.INSTANCE = null;
CommandManager._locked = true;
CommandManager.LOG_CONTEXT = "[GLASSCAT COMMAND MANAGER]";
exports.CommandManager = CommandManager;
;
