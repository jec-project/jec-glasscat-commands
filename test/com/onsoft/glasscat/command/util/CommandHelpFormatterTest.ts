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

import { TestSuite, Test, BeforeAll } from "jec-juta";
import { expect } from "chai";
import { CommandHelpFormatter } from "../../../../../../src/com/onsoft/glasscat/command/util/CommandHelpFormatter";
import { CommandDescriptorBuilder } from "../../../../../../src/com/onsoft/glasscat/command/util/CommandDescriptorBuilder"
import { CommandDescriptor } from "../../../../../../src/com/onsoft/glasscat/command/core/CommandDescriptor";
import { ParameterDescriptorBuilder } from "../../../../../../src/com/onsoft/glasscat/command/util/ParameterDescriptorBuilder"
import { ParameterDescriptor } from "../../../../../../src/com/onsoft/glasscat/command/core/ParameterDescriptor";

@TestSuite({
  description: "Test the CommandHelpFormatter class methods."
})
export class CommandHelpFormatterTest {

  private formatter:CommandHelpFormatter = null;
  private commandBuilder:CommandDescriptorBuilder = null;
  private paramBuilder:ParameterDescriptorBuilder = null;

  @BeforeAll()
  public initTest():void {
    this.formatter =  new CommandHelpFormatter();
    this.commandBuilder = new CommandDescriptorBuilder();
    this.paramBuilder = new ParameterDescriptorBuilder();
  }
  
  @Test({
    description: "should return a string that contains 'command:'"
  })
  public commandTest():void {
    const name:string = "foo";
    const description:string = "bar";
    const descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description
    );
    expect(this.formatter.format(descriptor)).to.include("command:");
  }

  @Test({
    description: "should return a string that contains the specified name"
  })
  public nameTest():void {
    const name:string = "foo";
    const description:string = "bar";
    const descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description
    );
    expect(this.formatter.format(descriptor)).to.include(name);
  }

  @Test({
    description: "should return a string that contains the specified description"
  })
  public descriptionTest():void {
    const name:string = "foo";
    const description:string = "bar";
    const descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description
    );
    expect(this.formatter.format(descriptor)).to.include(description);
  }
  
  @Test({
    description: "should return a string that contains the specified parameter name"
  })
  public paramNameTest():void {
    const name:string = "foo";
    const description:string = "bar";
    const paramName:string = "fooName";
    const paramDescription:string = "barName";
    const type:string = "object";
    const paramDesc:ParameterDescriptor = this.paramBuilder.build(
      paramName, paramDescription, type
    );
    const descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description, [paramDesc]
    );
    expect(this.formatter.format(descriptor)).to.include(paramName);
  }
  
  @Test({
    description: "should return a string that contains the specified parameter description"
  })
  public paramDescriptionTest():void {
    const name:string = "foo";
    const description:string = "bar";
    const paramName:string = "fooName";
    const paramDescription:string = "barName";
    const type:string = "object";
    const paramDesc:ParameterDescriptor = this.paramBuilder.build(
      paramName, paramDescription, type
    );
    const descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description, [paramDesc]
    );
    expect(this.formatter.format(descriptor)).to.include(paramDescription);
  }
  
  @Test({
    description: "should return a string that contains the specified parameter type"
  })
  public paramTypeTest():void {
    const name:string = "foo";
    const description:string = "bar";
    const paramName:string = "fooName";
    const paramDescription:string = "barName";
    const type:string = "object";
    const paramDesc:ParameterDescriptor = this.paramBuilder.build(
      paramName, paramDescription, type
    );
    const descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description, [paramDesc]
    );
    expect(this.formatter.format(descriptor)).to.include(type);
  }
  
  @Test({
    description: "should return a string that not contains 'required'"
  })
  public paramRequiredFalseTest():void {
    const name:string = "foo";
    const description:string = "bar";
    const paramName:string = "fooName";
    const paramDescription:string = "barName";
    const type:string = "object";
    const paramDesc:ParameterDescriptor = this.paramBuilder.build(
      paramName, paramDescription, type, false
    );
    const descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description, [paramDesc]
    );
    expect(this.formatter.format(descriptor)).to.not.include("required");
  }

  @Test({
    description: "should return a string that contains 'required'"
  })
  public paramRequiredTrueTest():void {
    const name:string = "foo";
    const description:string = "bar";
    const paramName:string = "fooName";
    const paramDescription:string = "barName";
    const type:string = "object";
    const paramDesc:ParameterDescriptor = this.paramBuilder.build(
      paramName, paramDescription, type, true
    );
    const descriptor:CommandDescriptor = this.commandBuilder.build(
      name, description, [paramDesc]
    );
    expect(this.formatter.format(descriptor)).to.include("required");
  }
}