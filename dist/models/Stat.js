"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stat = void 0;
const mongoose_1 = require("mongoose");
const StatSchemaDef = {
    event: { type: String, default: [], index: true },
    peerId: { type: String, index: true },
    participantId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Participant',
    },
    participantJid: { type: String, index: true },
    participantName: { type: String, index: true },
    roomId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Room',
    },
    roomJid: { type: String, index: true },
    roomName: { type: String, index: true },
    tag: { type: String, index: true },
    data: Object,
};
const StatSchema = new mongoose_1.Schema(StatSchemaDef, { timestamps: true });
exports.Stat = (0, mongoose_1.model)('Stat', StatSchema);
//# sourceMappingURL=Stat.js.map