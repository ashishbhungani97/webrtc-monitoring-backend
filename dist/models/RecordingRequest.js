"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordingRequest = void 0;
const mongoose_1 = require("mongoose");
const requestRecordingDef = {
    ownerId: { type: String, index: true },
    recorderEmail: { type: String },
    expiry: { type: Date },
    used: { type: Boolean, default: false },
    fileIds: [String],
    sealed: { type: Boolean, default: false },
};
const recordingRequestSchema = new mongoose_1.Schema(requestRecordingDef, {
    timestamps: true,
});
exports.RecordingRequest = (0, mongoose_1.model)('RecordingRequest', recordingRequestSchema);
//# sourceMappingURL=RecordingRequest.js.map