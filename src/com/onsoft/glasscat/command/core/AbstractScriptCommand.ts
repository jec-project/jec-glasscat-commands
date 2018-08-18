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

import {ScriptCommand} from "../ScriptCommand";
import {Logger} from "jec-commons";
import {CommandDescriptor} from "./CommandDescriptor";

/**
 * The abstract implementation of the <code>ScriptCommand</code> interface.
 */
export abstract class AbstractScriptCommand implements ScriptCommand {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>AbstractScriptCommand</code> instance.
   */
  constructor() {}

  //////////////////////////////////////////////////////////////////////////////
  // Protected properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * The <code>Logger</code> instance for this command.
   */
  protected __logger:Logger = null;

  //////////////////////////////////////////////////////////////////////////////
  // Public functions
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public execute(argv:any, callback:(success?:any, err?:any)=>void):void {}

  /**
   * @inheritDoc
   */
  public setLogger(logger:Logger):void {
    this.__logger = logger;
  }

  /**
   * @inheritDoc
   */
  public getHelp(argv:any):CommandDescriptor {
    return null;
  }
}