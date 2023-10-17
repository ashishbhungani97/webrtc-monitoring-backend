"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorEvent = void 0;
const mongoose_1 = require("mongoose");
const ErrorEventSchemaDef = {
    roomId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Room',
    },
    participantId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Participant',
    },
    eventSourceType: { type: String, index: false },
    eventSourceId: { type: String, index: false },
    errorType: { type: String, index: false },
    errorValue: { type: String, index: false },
    timestamp: { type: Date, index: false },
};
const ErrorEventSchema = new mongoose_1.Schema(ErrorEventSchemaDef, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
});
exports.ErrorEvent = (0, mongoose_1.model)('ErrorEvent', ErrorEventSchema);
//# sourceMappingURL=ErrorEvent.js.map