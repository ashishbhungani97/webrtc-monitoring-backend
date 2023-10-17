"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Recording = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const recordingSchema = new mongoose_1.default.Schema({
    ltid: String,
    email: String,
    duration: Number,
}, { timestamps: true });
recordingSchema.methods = {
    format: function () {
        const result = {
            ltid: this.ltid,
            email: this.email,
            duration: this.duration,
            createdAt: this.createdAt,
        };
        return result;
    },
};
exports.Recording = mongoose_1.default.model('Recording', recordingSchema);
//# sourceMappingURL=Recording.js.map