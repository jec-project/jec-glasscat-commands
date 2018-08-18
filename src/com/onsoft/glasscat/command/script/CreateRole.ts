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
import * as mkpath from "mkpath";
import {JecStringsEnum, UrlStringsEnum} from "jec-commons";
import {TemplatePaths, TemplatePathsSolver} from "jec-glasscat-core";
import {AbstractScriptCommand} from "../core/AbstractScriptCommand";
import {ScriptCommand} from "../ScriptCommand";
import {CommandDescriptorBuilder} from "../util/CommandDescriptorBuilder";
import {ParameterDescriptor} from "../core/ParameterDescriptor";
import {ParameterDescriptorBuilder} from "../util/ParameterDescriptorBuilder";
import {CommandDescriptor} from "../core/CommandDescriptor";

/**
 * The command that allows to create a <code>BasicSecurityRole</code> concrete
 * implementation for a GlassCat EJP.
 * 
 * [[include:CreateRole.md]]
 * 
 */
export class CreateRole extends AbstractScriptCommand implements ScriptCommand {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>CreateRole</code> instance.
   */
  constructor() {
    super();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Returns the template for the <code>BasicSecurityRole</code> class to
   * create.
   * 
   * @param {string} className the class name for the 
   *                           <code>BasicSecurityRole</code> object to create.
   * @param {string} glasscatPath the relative path to the GlassCat sources.
   * @return {string} the template for the <code>BasicSecurityRole</code> object
   *                  to create.
   */
  private createTemplate(className:string, role:string,
                                           glasscatPath:string):string {
    const template:string =
`import {BasicSecurityRole} from "jec-glasscat-core";

/**
 * ${className} class.
 *
 * @class ${className}
 * @constructor
 * @extends BasicSecurityRole
 */
export class ${className} extends BasicSecurityRole {

  constructor() {
    super("${role}");
  }
}`;
    return template;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public functions
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public execute(argv:any, callback:(success?:any, err?:any)=>void):void {
    const project:string = argv.projectPath;
    const name:string = argv.name;
    const role:string = argv.role;
    const path:string = argv.path;
    let solver:TemplatePathsSolver = null;
    let templatePaths:TemplatePaths = null;
    if(!project || project === UrlStringsEnum.EMPTY_STRING) {
      throw new SyntaxError("projectPath option is required");
    }
    if(!name || name === UrlStringsEnum.EMPTY_STRING) {
      throw new SyntaxError("name option is required");
    }
    if(!role || role === UrlStringsEnum.EMPTY_STRING) {
      throw new SyntaxError("role option is required");
    }
    solver = new TemplatePathsSolver();
    templatePaths =
               solver.resolve(name, JecStringsEnum.TS_EXTENSION, project, path);
    mkpath(templatePaths.directoryPath, (err:any)=> {
      if(err) {
        callback(null, err);
      } else {
        fs.writeFile(
          templatePaths.filePath,
          this.createTemplate(name, role, templatePaths.relativePathPattern),
          (err:NodeJS.ErrnoException)=> {
            callback(null, err);
          }
        );
      }
    });
  }

  /**
   * @inheritDoc
   */
  public getHelp(argv:any):any {
    const commBuilder:CommandDescriptorBuilder = new CommandDescriptorBuilder();
    const paramBuilder:ParameterDescriptorBuilder =
                                               new ParameterDescriptorBuilder();
    const parameters:ParameterDescriptor[] = new Array<ParameterDescriptor>();
    parameters.push(
      paramBuilder.build(
        "projectPath",
        "Represents the project directory for which to create the security role.",
        "string",
        true
      )
    );
    parameters.push(
      paramBuilder.build(
        "name",
        "The name of the security role to create.",
        "string",
        true
      )
    );
    parameters.push(
      paramBuilder.build(
        "path",
        "Represents the directory name, whithin the project, where to create the security role.",
        "string",
        true
      )
    );
    parameters.push(
      paramBuilder.build(
        "compile",
        "Indicate whether to compile the generated TypeScript file (true), or not (false).",
        "boolean"
      )
    );
    const descriptor:CommandDescriptor = commBuilder.build(
      "$glasscat create-role",
      "Creates a new security role class for a GlassCat EJP.",

      parameters
    );
    return descriptor;
  }
}