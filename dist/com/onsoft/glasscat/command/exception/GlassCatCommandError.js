"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GlassCatCommandError extends Error {
    constructor(message, originalStack) {
        super(message);
        this._originalStack = null;
        this.initObj(originalStack);
    }
    initObj(originalStack) {
        this._originalStack = originalStack;
    }
    getStack() {
        return this._originalStack;
    }
}
exports.GlassCatCommandError = GlassCatCommandError;
