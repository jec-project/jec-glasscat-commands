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

import * as fs from "fs";
import {AbstractScriptCommand} from "../../core/AbstractScriptCommand";
import {ScriptCommand} from "../../ScriptCommand";
import {CommandDescriptorBuilder} from "../../util/CommandDescriptorBuilder";
import {CommandDescriptor} from "../../core/CommandDescriptor";

/**
 * The command that returns all locales for a GlassCat Server instance.
 * 
 * [[include:GetLocales.md]]
 * 
 */
export class GetLocales extends AbstractScriptCommand implements ScriptCommand {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>GetLocales</code> instance.
   */
  constructor() {
    super();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public functions
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public execute(argv:any, callback:(success?:any, err?:any)=>void):void {
    fs.readdir(
      "./public/locales",
      (err:NodeJS.ErrnoException, files:string[])=> {
        if(err) {
          callback(null, err);
        } else {
          const result:any[] = new Array<any>();
          let locale:string = null;
          files.forEach((value:string)=> {
            locale = value.substring(0, value.length - 5);
            result.push(locale);
          });
          callback(result);
        }
      }
    );
  }

  /**
   * @inheritDoc
   */
  public getHelp(argv:any):any {
    const commBuilder:CommandDescriptorBuilder = new CommandDescriptorBuilder();
    const descriptor:CommandDescriptor = commBuilder.build(
      "$glasscat create-role",
      "Returns the list of all available locales for a GlassCat server instance."
    );
    return descriptor;
  }
}