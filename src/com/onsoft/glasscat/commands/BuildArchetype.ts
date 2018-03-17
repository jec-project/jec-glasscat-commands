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

import {ScriptCommand, AbstractScriptCommand, CommandDescriptorBuilder,
        CommandDescriptor, ParameterDescriptorBuilder,
        ParameterDescriptor} from "jec-glasscat-cli";
import {Wildcat, WildcatBuilder, WildcatRequestBuilder, WildcatRequest,
        WildcatLoggerProxy} from "jec-wildcat";
import {LoggerManager} from "jec-glasscat-core";
import {Logger} from "jec-commons";

/**
 * The command that allows to build GlassCat projects form Wildcat archetypes.
 * 
 * [[include:BuildArchetype.md]]
 * 
 */
export class BuildArchetype extends AbstractScriptCommand
                            implements ScriptCommand {

  //////////////////////////////////////////////////////////////////////////////
  // Constructor function
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Creates a new <code>BuildArchetype</code> instance.
   */
  constructor() {
    super();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private functions
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Builds and returns a new <code>Wildcat</code> instance.
   */
  private buildProcessor():Wildcat {
    WildcatLoggerProxy.getInstance().setLogger(this.__logger);
    const wildcatBuilder:WildcatBuilder = new WildcatBuilder();
    const wildcat:Wildcat = wildcatBuilder.build();
    return wildcat;
  }

  /**
   * Builds and returns a new <code>WildcatRequest</code> instance.
   * 
   * @param {any} argv the properties used for generating the request.
   * @return {WildcatRequest} a new <code>WildcatRequest</code> instance.
   */
  private buildRequest(argv:any):WildcatRequest {
    const requestBuilder:WildcatRequestBuilder = new WildcatRequestBuilder();
    requestBuilder.gpm(argv.gpm);
    requestBuilder.projectName(argv.projectName);
    requestBuilder.contextRoot(argv.contextRoot);
    requestBuilder.directory(argv.directory);
    requestBuilder.properties(argv);
    return requestBuilder.build();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public functions
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @inheritDoc
   */
  public execute(argv:any, callback:(err:any)=>void):void {
    let wildcat:Wildcat = null;
    let request:WildcatRequest = null;
    try{
      wildcat = this.buildProcessor();
      request = this.buildRequest(argv);
      wildcat.execute(request, callback);
    } catch(err) {
      callback(err);
    }
  }

  /**
   * @inheritDoc
   */
  public getHelp(argv:any):CommandDescriptor {
    const commBuilder:CommandDescriptorBuilder = new CommandDescriptorBuilder();
    const paramBuilder:ParameterDescriptorBuilder =
                                               new ParameterDescriptorBuilder();
    const parameters:ParameterDescriptor[] = new Array<ParameterDescriptor>();
    parameters.push(
      paramBuilder.build(
        "gpm",
        "The reference to the 'GlassCat Project Model' to use for creating the archetype.",
        "string",
        true
      )
    );
    parameters.push(
      paramBuilder.build(
        "projectName",
        "The name of the project created from the archetype.",
        "string",
        true
      )
    );
    parameters.push(
      paramBuilder.build(
        "directory",
        "The name of the target directory for the project created from the archetype.",
        "string",
        true
      )
    );
    parameters.push(
      paramBuilder.build(
        "contextRoot",
        "The context root of the project created from the archetype.",
        "string",
        true
      )
    );
    const descriptor:CommandDescriptor = commBuilder.build(
      "$glasscat build-archetype",
      "Builds and deploies an EJP archetype from the 'public/wildcat/' repository, to the workspace."
    );
    return descriptor;
  }
}