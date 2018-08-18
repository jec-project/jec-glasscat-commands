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

import {CommandDescriptor} from "../core/CommandDescriptor";
import {ParameterDescriptor} from "../core/ParameterDescriptor";
import chalk from "chalk";

/**
 * A utility class for formatting help messages of the GlassCat commands API.
 */
export class CommandHelpFormatter  {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>CommandHelpFormatter</code> instance.
   */
  constructor() {}
  
  //////////////////////////////////////////////////////////////////////////////
  // Public functions
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Formats and returns the help message for the specified command.
   * 
   * @param {CommandDescriptor} command the command description for the help
   *                                    message to format.
   * @return {string} the help message for the specified command.
   */
  public format(command:CommandDescriptor):string {
    const params:ParameterDescriptor[] = command.parameters;
    let msg:string = chalk.blue(`\ncommand: ${command.name}`) +
                     `\n         ${command.description}`;
    let type:string = null;
    if(params) {
      msg += "\n";
      params.forEach((desc:ParameterDescriptor)=> {
        type = desc.type;
        msg += chalk.blue(`\n       --${desc.name}`);
        if(type) msg += chalk.green(`\n         type: ${type}`);
        if(desc.required) msg += chalk.green(" - ") + chalk.red("required");
        msg += `\n         ${desc.description}`;
      });
    }
    return msg;
  }
}