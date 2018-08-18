"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommandDescriptor_1 = require("../core/CommandDescriptor");
class CommandDescriptorBuilder {
    constructor() { }
    build(name, description, parameters) {
        const descriptor = new CommandDescriptor_1.CommandDescriptor();
        descriptor.name = name;
        descriptor.description = description;
        descriptor.parameters = parameters;
        return descriptor;
    }
}
exports.CommandDescriptorBuilder = CommandDescriptorBuilder;
