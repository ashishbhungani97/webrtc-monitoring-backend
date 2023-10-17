"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participant = void 0;
const mongoose_1 = require("mongoose");
const ParticipantSchemaDef = {
    participantName: { type: String, index: false },
    participantJid: { type: String, index: true },
    participantRoomJid: { type: String, index: false },
    roomName: { type: String, index: false },
    roomJid: { type: String, index: true },
    roomId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Room',
    },
    faulty: { type: Number, index: true },
    joined: { type: Date, index: true },
    left: { type: Date, index: false },
};
const ParticipantSchema = new mongoose_1.Schema(ParticipantSchemaDef, {
    timestamps: true,
});
exports.Participant = (0, mongoose_1.model)('Participant', ParticipantSchema);
//# sourceMappingURL=Participant.js.map