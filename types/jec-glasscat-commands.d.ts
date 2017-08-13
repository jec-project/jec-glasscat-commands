/*!
 * JEC GlassCat Commands Node Module
 * Copyright(c) 2017 Pascal ECHEMANN
 * Apache 2.0 Licensed
 * This is a part of the JEC Projects: <https://github.com/pechemann/JEC>
 */

declare module "jec-glasscat-commands" {

import {ScriptCommand, AbstractScriptCommand, CommandDescriptor} from "jec-glasscat-cli";

export class BuildArchetype extends AbstractScriptCommand implements ScriptCommand {    constructor();    private buildProcessor();    private buildRequest(argv);    execute(argv: any, callback: (err: any) => void): void;    getHelp(argv: any): CommandDescriptor;}export class CreateBootstrapFile extends AbstractScriptCommand implements ScriptCommand {    constructor();    private createTemplate(className, glasscatPath);    private createCompiledTemplate(className, glasscatPath);    execute(argv: any, callback: (err: any) => void): void;    getHelp(argv: any): any;}export class CreateJslet extends AbstractScriptCommand implements ScriptCommand {    constructor();    private createTemplate(className, glasscatPath);    private createCompiledTemplate(className, glasscatPath);    execute(argv: any, callback: (err: any) => void): void;    getHelp(argv: any): any;}export class CreateRole extends AbstractScriptCommand implements ScriptCommand {    constructor();    private createTemplate(className, role, glasscatPath);    execute(argv: any, callback: (err: any) => void): void;    getHelp(argv: any): any;}}