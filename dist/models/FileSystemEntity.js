"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileSchema = exports.folderSchema = exports.fileSystemEntitySchema = void 0;
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
const fileSystemEntitySchemaDef = {
    _id: { type: String, default: uuid_1.v1 },
    type: String,
    name: String,
    provider: String,
    createdAt: Date,
    updatedAt: Date,
    parentId: String,
};
const folderSchemaDef = {};
const fileSchemaDef = {
    description: String,
    size: Number,
    providerKey: String,
    url: String,
    recorderEmail: String,
    recorderName: String, //Used for plugin only
};
const options = { discriminatorKey: 'type', timestamps: true };
exports.fileSystemEntitySchema = new mongoose_1.Schema(fileSystemEntitySchemaDef, options);
exports.folderSchema = new mongoose_1.Schema(folderSchemaDef, options);
exports.fileSchema = new mongoose_1.Schema(fileSchemaDef, options);
//# sourceMappingURL=FileSystemEntity.js.map