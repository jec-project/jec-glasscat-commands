//  DO NOT ALTER OR REMOVE COPYRIGHT NOTICES OR THIS HEADER.
//
//   Copyright 2016-2018 Pascal ECHEMANN.
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

import {ScriptCommand} from "./ScriptCommand";
import {Logger, ConsoleLogger, SingletonError} from "jec-commons";
import {LoggerManager} from "jec-glasscat-core";
import * as minimist from "minimist";
import {CommandHelpFormatter} from "./util/CommandHelpFormatter";
import {CommandDescriptor} from "./core/CommandDescriptor";
import {GlassCatCommandError} from "./exception/GlassCatCommandError";

/**
 * The singleton responsible for running all commands in a GlassCat container.
 */
export class CommandManager {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>CommandManager</code> instance.
   */
  constructor() {
    if(CommandManager._locked || CommandManager.INSTANCE) {
      throw new SingletonError(CommandManager);
    } else {
      CommandManager._locked = true;
      const manager:LoggerManager =
                                 (LoggerManager.getInstance() as LoggerManager);
      this._logger = manager.isInitialized() ? manager : new ConsoleLogger();
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Singleton managment
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>CommandManager</code> singleton instance reference.
   */
  private static INSTANCE:CommandManager = null;

  /**
   * Prevents <code>CommandManager</code> illegal instanciations.
   */
  private static _locked:boolean = true;

  /**
   * Returns a reference to the <code>CommandManager</code> singleton.
   *
   * @return {CommandManager} a reference to the <code>CommandManager</code>
   *                          singleton.
   */
  public static getInstance():CommandManager{
    if(CommandManager.INSTANCE === null) {
      CommandManager._locked = false;
      CommandManager.INSTANCE = new CommandManager();
    }
    return CommandManager.INSTANCE;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The logger for this <code>CommandManager</code> instance.
   */
  private _logger:Logger = null;

  /**
   * The logger context for this <code>CommandManager</code> instance.
   */
  private static readonly LOG_CONTEXT:string = "[GLASSCAT COMMAND MANAGER]";

  //////////////////////////////////////////////////////////////////////////////
  // Public methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Executes the specified command.
   * 
   * @param {ScriptCommand} command the command to execute.
   * @param {Function} callback the callback method called an the end of the
   *                            process. This function takes an object parameter
   *                            which represents an error message whether the
   *                            process failed.
   */
  public execute(command:ScriptCommand,
                              callback?:(err:GlassCatCommandError)=>void):void {
    const argv:string[] = process.argv.splice(2);
    const name:string = command.constructor.name;
    const args:any = minimist(argv);
    const help:any = args.help || args.h || null;
    let formater:CommandHelpFormatter = null;
    let commandDescriptor:CommandDescriptor = null;
    let msg:string = "running command: name='" +
                      name + "', arguments='" + argv + "'";     
    this._logger.info(msg, CommandManager.LOG_CONTEXT);
    command.setLogger(this._logger);
    if(help) {
      msg = "running command help: '" + help + "'";
      this._logger.info(msg, CommandManager.LOG_CONTEXT);
      commandDescriptor = command.getHelp(help);
      if(commandDescriptor) {
        formater = new CommandHelpFormatter();
        console.log(formater.format(commandDescriptor));
      } else {
        console.log("No help information is available for this command.");
      }
      if(callback) {
        msg = "callback is not allowed for help commands";
        this._logger.warn(msg, CommandManager.LOG_CONTEXT);
      }
    } else {
      command.execute(
        args,
        (err:any)=> {
          if(err) {
            msg = "command error: name='" + name + "', error='" + err + "'";
            this._logger.error(msg, CommandManager.LOG_CONTEXT);
            const error:GlassCatCommandError = new GlassCatCommandError(
              msg, err.stack || err.toString()
            );
            if(callback) {
              callback(error);
            } else {
              throw error;
            }
          } else {
            msg = "command success: name='" + name + "'";
            this._logger.info(msg, CommandManager.LOG_CONTEXT);
            if(callback) callback(null);
          }
        }
      );
    }
  }
};
