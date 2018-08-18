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
import { CommandDescriptorBuilder } from "../../../../../../src/com/onsoft/glasscat/command/util/CommandDescriptorBuilder";
import { CommandDescriptor } from "../../../../../../src/com/onsoft/glasscat/command/core/CommandDescriptor";
import { ParameterDescriptor } from "../../../../../../src/com/onsoft/glasscat/command/core/ParameterDescriptor";

@TestSuite({
  description: "Test the CommandDescriptorBuilder class methods."
})
export class CommandDescriptorBuilderTest {

  private builder:CommandDescriptorBuilder = null;

  @BeforeAll()
  public initTest():void {
    this.builder =  new CommandDescriptorBuilder();
  }
  
  @Test({
    description: "should return a CommandDescriptor instance"
  })
  public buildCommandDescriptorTest():void {
    expect(
      this.builder.build(null, null)
    ).to.be.an.instanceOf(CommandDescriptor);
  }
  
  @Test({
    description: "should return a new CommandDescriptor instance with built from the specified parameters"
  })
  public buildTest():void {
    const name:string = "foo";
    const description:string = "bar";
    const params:ParameterDescriptor[] = new Array<ParameterDescriptor>();
    const descriptor:CommandDescriptor = this.builder.build(
      name, description, params
    );
    expect(descriptor.name).to.equal(name);
    expect(descriptor.description).to.equal(description);
    expect(descriptor.parameters).to.equal(params);
  }
  
  @Test({
    description: "should return 'undefined' when no ParameterDescriptor is specified"
  })
  public buildNoParameterDescriptorTest():void {
    const name:string = "foo";
    const description:string = "bar";
    const descriptor:CommandDescriptor = this.builder.build(name, description);
    expect(descriptor.parameters).to.be.undefined;
  }
}