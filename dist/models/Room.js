"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const mongoose_1 = require("mongoose");
const RoomSchemaDef = {
    roomName: { type: String, index: true },
    roomJid: { type: String, index: true },
    faulty: { type: Number, index: true },
    created: { type: Date, index: true },
    destroyed: { type: Date, index: false },
};
const RoomSchema = new mongoose_1.Schema(RoomSchemaDef, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
});
RoomSchema.virtual('participants', {
    ref: 'Participant',
    localField: '_id',
    foreignField: 'roomId',
    count: true, // And only get the number of docs
});
exports.Room = (0, mongoose_1.model)('Room', RoomSchema);
//# sourceMappingURL=Room.js.map