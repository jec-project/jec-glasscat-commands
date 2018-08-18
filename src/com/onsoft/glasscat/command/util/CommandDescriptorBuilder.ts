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

/**
 * The <code>CommandDescriptorBuilder</code> class creates and returns new 
 * instances of the <code>CommandDescriptor</code> class.
 */
export class CommandDescriptorBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>CommandDescriptorBuilder</code> instance.
   */
  constructor() {}
  
  //////////////////////////////////////////////////////////////////////////////
  // Public functions
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Build and returns a new command descriptor.
   * 
   * @param {string} name the name of the command.
   * @param {string} description the description of the command.
   * @param {string} parameters the list of parameters associated with the new
   *                            command.
   * @return {CommandDescriptor} a new <code>CommandDescriptor</code> instance.
   */
  public build(name:string, description:string,
                          parameters?:ParameterDescriptor[]):CommandDescriptor {
    const descriptor:CommandDescriptor = new CommandDescriptor();
    descriptor.name = name;
    descriptor.description = description;
    descriptor.parameters = parameters;
    return descriptor;
  }
}