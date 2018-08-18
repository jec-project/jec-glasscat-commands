"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jec_wildcat_1 = require("jec-wildcat");
const AbstractScriptCommand_1 = require("../core/AbstractScriptCommand");
const CommandDescriptorBuilder_1 = require("../util/CommandDescriptorBuilder");
const ParameterDescriptorBuilder_1 = require("../util/ParameterDescriptorBuilder");
class BuildArchetype extends AbstractScriptCommand_1.AbstractScriptCommand {
    constructor() {
        super();
    }
    buildProcessor() {
        jec_wildcat_1.WildcatLoggerProxy.getInstance().setLogger(this.__logger);
        const wildcatBuilder = new jec_wildcat_1.WildcatBuilder();
        const wildcat = wildcatBuilder.build();
        return wildcat;
    }
    buildRequest(argv) {
        const requestBuilder = new jec_wildcat_1.WildcatRequestBuilder();
        requestBuilder.gpm(argv.gpm);
        requestBuilder.projectName(argv.projectName);
        requestBuilder.contextRoot(argv.contextRoot);
        requestBuilder.directory(argv.directory);
        requestBuilder.properties(argv);
        return requestBuilder.build();
    }
    execute(argv, callback) {
        let wildcat = null;
        let request = null;
        try {
            wildcat = this.buildProcessor();
            request = this.buildRequest(argv);
            wildcat.execute(request, (err) => {
                callback(null, err);
            });
        }
        catch (err) {
            callback(null, err);
        }
    }
    getHelp(argv) {
        const commBuilder = new CommandDescriptorBuilder_1.CommandDescriptorBuilder();
        const paramBuilder = new ParameterDescriptorBuilder_1.ParameterDescriptorBuilder();
        const parameters = new Array();
        parameters.push(paramBuilder.build("gpm", "The reference to the 'GlassCat Project Model' to use for creating the archetype.", "string", true));
        parameters.push(paramBuilder.build("projectName", "The name of the project created from the archetype.", "string", true));
        parameters.push(paramBuilder.build("directory", "The name of the target directory for the project created from the archetype.", "string", true));
        parameters.push(paramBuilder.build("contextRoot", "The context root of the project created from the archetype.", "string", true));
        const descriptor = commBuilder.build("$glasscat build-archetype", "Builds and deploies an EJP archetype from the 'public/wildcat/' repository, to the workspace.");
        return descriptor;
    }
}
exports.BuildArchetype = BuildArchetype;
