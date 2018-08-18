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

import {ParameterDescriptor} from "../core/ParameterDescriptor";

/**
 * The <code>ParameterDescriptorBuilder</code> class creates and returns new 
 * instances of the <code>ParameterDescriptor</code> class.
 */
export class ParameterDescriptorBuilder {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ParameterDescriptorBuilder</code> instance.
   */
  constructor() {}
  
  //////////////////////////////////////////////////////////////////////////////
  // Public functions
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Build and returns a new parameter descriptor.
   * 
   * @param {string} name the name of the parameter.
   * @param {string} description the description of the parameter.
   * @param {string} type the type of the parameter.
   * @param {boolean} required indicates whether a command parameter id required
   *                           (<code>true</code>), or not (<code>false</code>).
   * @return {ParameterDescriptor} a new <code>ParameterDescriptor</code>
   *                               instance.
   */
  public build(name:string, description:string, type:string,
                                 required:boolean = false):ParameterDescriptor {
    const descriptor:ParameterDescriptor = new ParameterDescriptor();
    descriptor.name = name;
    descriptor.description = description;
    descriptor.type = type;
    descriptor.required = required;
    return descriptor;
  }
}