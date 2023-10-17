"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UrlModeConfig = exports.SharedSecretModeConfig = exports.StaticModeConfig = exports.IceServerConfig = exports.IceServerConfigMode = void 0;
const mongoose_1 = require("mongoose");
const staticModeConfigSchemaDef = {
    iceServers: { type: [mongoose_1.Schema.Types.Mixed], default: [] },
};
const staticModeConfigSchema = new mongoose_1.Schema(staticModeConfigSchemaDef, {
    _id: false,
});
const sharedSecretModeConfigSchemaDef = {
    uri: { type: String, required: true },
    secret: { type: String, required: true },
};
const sharedSecretModeConfigSchema = new mongoose_1.Schema(sharedSecretModeConfigSchemaDef, { _id: false });
const urlModeConfigSchemaDef = {
    url: { type: String, required: true },
    method: { type: String, default: 'GET' },
    headers: { type: mongoose_1.Schema.Types.Mixed },
    body: { type: mongoose_1.Schema.Types.Mixed },
    extract: { type: String },
};
const urlModeConfigSchema = new mongoose_1.Schema(urlModeConfigSchemaDef, { _id: false });
var IceServerConfigMode;
(function (IceServerConfigMode) {
    IceServerConfigMode["STATIC"] = "static";
    IceServerConfigMode["SHARED_SECRET"] = "shared-secret";
    IceServerConfigMode["URL"] = "url";
})(IceServerConfigMode = exports.IceServerConfigMode || (exports.IceServerConfigMode = {}));
const iceServerConfigSchemaDef = {
    mode: {
        type: String,
        enum: Object.values(IceServerConfigMode),
        required: true,
    },
    ownerId: { type: String, required: true, index: true },
    pluginId: { type: String, required: true, index: true },
};
const iceServerConfigSchema = new mongoose_1.Schema(iceServerConfigSchemaDef, {
    timestamps: true,
    discriminatorKey: 'mode',
});
exports.IceServerConfig = (0, mongoose_1.model)('IceServerConfig', iceServerConfigSchema);
exports.StaticModeConfig = exports.IceServerConfig.discriminator('static', staticModeConfigSchema);
exports.SharedSecretModeConfig = exports.IceServerConfig.discriminator('shared-secret', sharedSecretModeConfigSchema);
exports.UrlModeConfig = exports.IceServerConfig.discriminator('url', urlModeConfigSchema);
//# sourceMappingURL=ICEServerConfig.js.map