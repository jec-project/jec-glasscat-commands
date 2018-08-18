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

import { TestSuite, Test } from "jec-juta";
import { expect } from "chai";
import { ScriptCommand } from "../../../../../src/com/onsoft/glasscat/command/ScriptCommand";
import { CommandManager } from "../../../../../src/com/onsoft/glasscat/command/CommandManager";
import { GlassCatCommandError } from "../../../../../src/com/onsoft/glasscat/command/exception/GlassCatCommandError";
import { ValidTestCommand } from "../../../../../utils/test-utils/classes/ValidTestCommand";
import { InvalidTestCommand } from "../../../../../utils/test-utils/classes/InvalidTestCommand";
import { SingletonError } from "jec-commons";

@TestSuite({
  description: "Test the CommandManager class methods."
})
export class CommandManagerTest {

  @Test({
    description: "should throw a SingletonError error when calling the constructor function"
  })
  public singletonErrorTest():void {
    const buildInstance:Function = function():void {
      new CommandManager();
    };
    expect(buildInstance).to.throw(SingletonError);
  }

  @Test({
    description: "should return a CommandManager instance"
  })
  public getInstanceTest():void {
    expect(CommandManager.getInstance()).to.be.an.instanceof(CommandManager);
  }

  @Test({
    description: "should return a singleton reference"
  })
  public validSingletonTest():void {
    const manager1:CommandManager = CommandManager.getInstance();
    const manager2:CommandManager = CommandManager.getInstance();
    expect(manager1).to.equal(manager2);
  }
  
  @Test({
    description: "should execute a command without error"
  })
  public executeValidCommandTest():void {
    const command:ScriptCommand = new ValidTestCommand();
    CommandManager.getInstance().execute(command, (err:GlassCatCommandError)=>{
      expect(err).to.be.null;
    });
  }

  @Test({
    description: "should throw a GlassCatCommandError excption"
  })
  public executeInvalidCommandErrorTest():void {
    const command:ScriptCommand = new InvalidTestCommand();
    const doExecuteCommand:Function = function():void {
      CommandManager.getInstance().execute(command);
    };
    expect(doExecuteCommand).to.throw(GlassCatCommandError);
  }

  
  @Test({
    description: "should throw invoke the callback function  with GlassCatCommandError object as parameter"
  })
  public executeInvalidCommandTest():void {
    const command:ScriptCommand = new InvalidTestCommand();
    CommandManager.getInstance().execute(command, (err:GlassCatCommandError)=>{
      expect(err).to.be.an.instanceOf(GlassCatCommandError);
    });
  }
}