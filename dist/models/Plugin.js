"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Plugin = void 0;
const mongoose_1 = require("mongoose");
const pluginSchemaDef = {
    synonyms: { type: [String], default: [], index: true },
    ownerId: { type: String, index: true },
    domain: { type: String, index: true },
    revoked: { type: Boolean, default: false },
};
const pluginSchema = new mongoose_1.Schema(pluginSchemaDef, { timestamps: true });
exports.Plugin = (0, mongoose_1.model)('Plugin', pluginSchema);
//# sourceMappingURL=Plugin.js.map