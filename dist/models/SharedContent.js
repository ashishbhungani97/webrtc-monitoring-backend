"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedContent = void 0;
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const sharedContentSchemaDef = {
    _id: { type: String, default: uuid_1.v4 },
    ownerId: { type: String, index: true },
    entityIds: [String],
    createdAt: Date,
    updatedAt: Date,
};
const sharedContentSchema = new mongoose_1.Schema(sharedContentSchemaDef, {
    timestamps: true,
});
exports.SharedContent = (0, mongoose_1.model)('SharedContent', sharedContentSchema);
//# sourceMappingURL=SharedContent.js.map