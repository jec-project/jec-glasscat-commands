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
import { ParameterDescriptor } from "../../../../../../src/com/onsoft/glasscat/command/core/ParameterDescriptor";

@TestSuite({
  description: "Test the ParameterDescriptor class properties."
})
export class ParameterDescriptorTest {

  public descriptor:ParameterDescriptor = null;

  @BeforeAll()
  public initTest():void {
    this.descriptor = new ParameterDescriptor();
  }

  @Test({
    description: "should have a 'name' property set to 'null'"
  })
  public nameTest():void {
    expect(this.descriptor).to.have.property("name", null);
  }
  
  @Test({
    description: "should have a 'description' property set to 'null'"
  })
  public descriptionTest():void {
    expect(this.descriptor).to.have.property("description", null);
  }
  
  @Test({
    description: "should have a 'type' property set to 'null'"
  })
  public typeTest():void {
    expect(this.descriptor).to.have.property("type", null);
  }
  
  @Test({
    description: "should have a 'required' property set to 'false'"
  })
  public requiredTest():void {
    expect(this.descriptor).to.have.property("required", false);
  }
}