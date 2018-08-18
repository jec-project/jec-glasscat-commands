"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ParameterDescriptor_1 = require("../core/ParameterDescriptor");
class ParameterDescriptorBuilder {
    constructor() { }
    build(name, description, type, required = false) {
        const descriptor = new ParameterDescriptor_1.ParameterDescriptor();
        descriptor.name = name;
        descriptor.description = description;
        descriptor.type = type;
        descriptor.required = required;
        return descriptor;
    }
}
exports.ParameterDescriptorBuilder = ParameterDescriptorBuilder;
