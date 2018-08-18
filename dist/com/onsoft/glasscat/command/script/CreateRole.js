"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const mkpath = require("mkpath");
const jec_commons_1 = require("jec-commons");
const jec_glasscat_core_1 = require("jec-glasscat-core");
const AbstractScriptCommand_1 = require("../core/AbstractScriptCommand");
const CommandDescriptorBuilder_1 = require("../util/CommandDescriptorBuilder");
const ParameterDescriptorBuilder_1 = require("../util/ParameterDescriptorBuilder");
class CreateRole extends AbstractScriptCommand_1.AbstractScriptCommand {
    constructor() {
        super();
    }
    createTemplate(className, role, glasscatPath) {
        const template = `import {BasicSecurityRole} from "jec-glasscat-core";

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
    execute(argv, callback) {
        const project = argv.projectPath;
        const name = argv.name;
        const role = argv.role;
        const path = argv.path;
        let solver = null;
        let templatePaths = null;
        if (!project || project === jec_commons_1.UrlStringsEnum.EMPTY_STRING) {
            throw new SyntaxError("projectPath option is required");
        }
        if (!name || name === jec_commons_1.UrlStringsEnum.EMPTY_STRING) {
            throw new SyntaxError("name option is required");
        }
        if (!role || role === jec_commons_1.UrlStringsEnum.EMPTY_STRING) {
            throw new SyntaxError("role option is required");
        }
        solver = new jec_glasscat_core_1.TemplatePathsSolver();
        templatePaths =
            solver.resolve(name, jec_commons_1.JecStringsEnum.TS_EXTENSION, project, path);
        mkpath(templatePaths.directoryPath, (err) => {
            if (err) {
                callback(null, err);
            }
            else {
                fs.writeFile(templatePaths.filePath, this.createTemplate(name, role, templatePaths.relativePathPattern), (err) => {
                    callback(null, err);
                });
            }
        });
    }
    getHelp(argv) {
        const commBuilder = new CommandDescriptorBuilder_1.CommandDescriptorBuilder();
        const paramBuilder = new ParameterDescriptorBuilder_1.ParameterDescriptorBuilder();
        const parameters = new Array();
        parameters.push(paramBuilder.build("projectPath", "Represents the project directory for which to create the security role.", "string", true));
        parameters.push(paramBuilder.build("name", "The name of the security role to create.", "string", true));
        parameters.push(paramBuilder.build("path", "Represents the directory name, whithin the project, where to create the security role.", "string", true));
        parameters.push(paramBuilder.build("compile", "Indicate whether to compile the generated TypeScript file (true), or not (false).", "boolean"));
        const descriptor = commBuilder.build("$glasscat create-role", "Creates a new security role class for a GlassCat EJP.", parameters);
        return descriptor;
    }
}
exports.CreateRole = CreateRole;
