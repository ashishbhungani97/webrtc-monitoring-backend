"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TroubleshooterSession = void 0;
const mongoose_1 = require("mongoose");
const troubleshooterSessionSchemaDef = {
    clientId: { type: String, index: true },
    pluginId: { type: String, index: true },
    ownerId: { type: String, index: true },
    email: { type: String, index: true },
    tests: {
        browser: {
            // TODO: future: add messages etc.
            status: { type: Boolean, default: false },
        },
        camera: {
            status: { type: Boolean, default: false },
        },
        microphone: {
            status: { type: Boolean, default: false },
        },
        network: {
            status: { type: Boolean, default: false },
        },
        overall: {
            status: { type: Boolean, default: false },
        },
    },
    metadata: {
        browser: {
            name: { type: String, default: '' },
            version: { type: String, default: '' },
            isPrivateBrowsing: { type: Boolean, default: false },
        },
        os: {
            name: { type: String, default: '' },
            version: { type: String, default: '' },
        },
        audioInputDevices: [
            {
                kind: { type: String, default: '' },
                label: { type: String, default: '' },
                _id: false,
            },
        ],
        audioOutputDevices: [
            {
                kind: { type: String, default: '' },
                label: { type: String, default: '' },
                _id: false,
            },
        ],
        videoInputDevices: [
            {
                kind: { type: String, default: '' },
                label: { type: String, default: '' },
                _id: false,
            },
        ],
        display: {
            aspectRatio: { type: String, default: '' },
            resolution: { type: String, default: '' },
        },
    },
};
const troubleshooterSessionSchema = new mongoose_1.Schema(troubleshooterSessionSchemaDef, {
    timestamps: true,
});
exports.TroubleshooterSession = (0, mongoose_1.model)('TroubleshooterSession', troubleshooterSessionSchema);
//# sourceMappingURL=TroubleshooterSession.js.map