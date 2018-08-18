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
import { expect, assert } from "chai";
import { AbstractScriptCommandImpl } from "../../../../../../utils/test-utils/classes/AbstractScriptCommandImpl";
import { Logger, ConsoleLogger } from "jec-commons";

@TestSuite({
  description: "Test the AbstractScriptCommand class methods."
})
export class AbstractScriptCommandTest {

  @Test({
    description: "should return 'null' as default logger value"
  })
  public getLoggerTest():void {
    const command:AbstractScriptCommandImpl = new AbstractScriptCommandImpl();
    expect(command.getLogger()).to.be.null;
  }

  @Test({
    description: "should set a Logger object for the specified command"
  })
  public setLoggerTest():void {
    const command:AbstractScriptCommandImpl = new AbstractScriptCommandImpl();
    const logger:Logger = new ConsoleLogger();
    command.setLogger(logger);
    expect(command.getLogger()).to.equal(logger);
  }

  @Test({
    description: "should return 'null' as default logger value"
  })
  public getHelpTest():void {
    const command:AbstractScriptCommandImpl = new AbstractScriptCommandImpl();
    expect(command.getHelp({})).to.be.null;
  }

  @Test({
    description: "should do nothing by default"
  })
  public executeTest():void {
    const command:AbstractScriptCommandImpl = new AbstractScriptCommandImpl();
    expect(
      command.execute({}, (success:any, err:any)=> {
        assert.fail(null, err, "callback should never been called");
      }
    )).to.be.undefined;
  }
}