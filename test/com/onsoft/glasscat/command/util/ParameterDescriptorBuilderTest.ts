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
import { ParameterDescriptorBuilder } from "../../../../../../src/com/onsoft/glasscat/command/util/ParameterDescriptorBuilder";
import { ParameterDescriptor } from "../../../../../../src/com/onsoft/glasscat/command/core/ParameterDescriptor";

@TestSuite({
  description: "Test the ParameterDescriptorBuilder class methods."
})
export class ParameterDescriptorBuilderTest {

  private builder:ParameterDescriptorBuilder = null;

  @BeforeAll()
  public initTest():void {
    this.builder =  new ParameterDescriptorBuilder();
  }
  
  @Test({
    description: "should return a ParameterDescriptor instance"
  })
  public buildParameterDescriptorTest():void {
    expect(
      this.builder.build(null, null, null)
    ).to.be.an.instanceOf(ParameterDescriptor);
  }
  
  @Test({
    description: "should return a new ParameterDescriptor instance with built from the specified parameters"
  })
  public buildTest():void {
    const name:string = "foo";
    const description:string = "bar";
    const type:string = "object";
    const descriptor:ParameterDescriptor = this.builder.build(
      name, description, type, true
    );
    expect(descriptor.name).to.equal(name);
    expect(descriptor.description).to.equal(description);
    expect(descriptor.type).to.equal(type);
    expect(descriptor.required).to.be.true;
  }
  
  @Test({
    description: "should return 'false' when no 'required' parameter is specified"
  })
  public buildNoParameterDescriptorTest():void {
    const name:string = "foo";
    const description:string = "bar";
    const type:string = "object";
    const descriptor:ParameterDescriptor = this.builder.build(
      name, description, type
    );
    expect(descriptor.required).to.be.false;
  }
}