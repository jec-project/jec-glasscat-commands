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

/**
 * A data transfert object that represents a description for the parameters of 
 * a GlassCat command.
 */
export class ParameterDescriptor {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>ParameterDescriptor</code> instance.
   */
  constructor() {}
  
  //////////////////////////////////////////////////////////////////////////////
  // Public properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The name of the command parameter.
   */
  public name:string = null;
  
  /**
   * The description of the command parameter.
   */
  public description:string = null;

  /**
   * Represents a type for a command parameter.
   */
  public type:string = null;

  /**
   * Indicates whether a command parameter id required (<code>true</code>), or 
   * not (<code>false</code>).
   */
  public required:boolean = false;
}