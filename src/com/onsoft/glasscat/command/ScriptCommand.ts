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

import {Logger} from "jec-commons";
import {CommandDescriptor} from "./core/CommandDescriptor";

/**
 * The <code>ScriptCommand</code> interface defines the API that you must implement to
 * create admin commands for managing GlassCat servers.
 */
export interface ScriptCommand {

  /**
   * Executes a GlassCat command.
   * 
   * @param {Object} argv the arguments passed to the command to execute.
   * @param {Function} callback the callback method called an the end of the
   *                            process.
   */
  execute(argv:any, callback:(success?:any, err?:any)=>void):void;

  /**
   * Sets the <code>Logger</code> instance for this command.
   * 
   * @param {Logger} logger the <code>Logger</code> instance for this command.
   */
  setLogger(logger:Logger):void;

  /**
   * Returns the help information for this command.
   * 
   * @param {Object} argv the arguments passed as context for the help
   *                      information to return.
   * @return {CommandDescriptor} an object that represents the help information 
   *                            for this command.
   */
  getHelp(argv:any):CommandDescriptor;
}