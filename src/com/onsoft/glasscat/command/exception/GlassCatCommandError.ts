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
 * The <code>GlassCatCommandError</code> represents an exception thrown by the  
 * GlassCat command manager when an error occurs during the execution of a
 * command.
 */
export class GlassCatCommandError extends Error {

  ////////////////////////////////////////////////////////////////////////////
  // Constructor function
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GlassCatCommandError</code> instance.
   * 
   * @param {string} message the error message.
   * @param {string} originalStack the original error stack associated with this
   *                               error.
   */
  constructor(message:string, originalStack:string) {
    super(message);
    this.initObj(originalStack);
  }

  ////////////////////////////////////////////////////////////////////////////
  // Private properties
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Thereference to the original error stack associated with this error.
   */
  private _originalStack:string = null;

  ////////////////////////////////////////////////////////////////////////////
  // Private methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes this object.
   * 
   * @param {string} originalStack the original error stack associated with this
   *                               error.
   */
  private initObj(originalStack:string):void {
    this._originalStack = originalStack;
  }

  ////////////////////////////////////////////////////////////////////////////
  // Public methods
  ////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the original error stack associated with this error.
   * 
   * @return {string} the original error stack associated with this error.
   */
  public getStack():string {
    return this._originalStack;
  }
}