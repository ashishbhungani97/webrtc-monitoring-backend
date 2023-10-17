"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setConfig = exports.getConfig = exports.getJwtToken = exports.regenerate = exports.revoke = exports.get = exports.create = exports.getAll = void 0;
const mongoose_1 = require("mongoose");
const secrets_1 = require("../../../config/secrets");
const ICEServerConfig_1 = require("../../../models/ICEServerConfig");
const Plugin_1 = require("../../../models/Plugin");
const iceServers_1 = require("./iceServers");
const auth_1 = require("../../../util/auth");
// TODO: Usually we don't show the old tokens to the user, but the UI has placeholders right now.
const sanitize = ({ _id, domain, createdAt, }) => ({ _id, domain, createdAt });
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plugins = yield Plugin_1.Plugin.find({
            ownerId: req.user._id,
            revoked: false,
        });
        res.json({
            success: true,
            data: plugins.map(sanitize),
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Unknown server error.',
        });
    }
});
exports.getAll = getAll;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let plugin = yield Plugin_1.Plugin.findOne({
            ownerId: req.user._id,
            domain: req.body.domain,
            revoked: false,
        });
        if (plugin) {
            res.status(409).json({
                success: false,
                data: sanitize(plugin),
                error: 'App token already exists',
            });
            return;
        }
        plugin = yield new Plugin_1.Plugin({
            ownerId: req.user._id,
            domain: req.body.domain,
        }).save();
        res.status(201).json({
            success: true,
            data: sanitize(plugin),
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Unknown server error.' });
    }
});
exports.create = create;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const plugin = yield Plugin_1.Plugin.findOne({
            _id: req.params.id,
            revoked: ((_a = req.query) === null || _a === void 0 ? void 0 : _a.revoked) === 'true' || false,
        });
        if (!plugin) {
            res.status(404).json({ success: false, error: 'App token not found.' });
            return;
        }
        res.json({
            success: true,
            data: sanitize(plugin),
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Unknown server error.' });
    }
});
exports.get = get;
const revoke = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plugin = yield Plugin_1.Plugin.findByIdAndUpdate(req.params.id, { $set: { revoked: true } }, { new: true });
        if (!plugin) {
            res.status(404).json({ success: false, error: 'App token not found.' });
            return;
        }
        res.json({
            success: true,
            data: sanitize(plugin),
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Unknown server error.' });
    }
});
exports.revoke = revoke;
const regenerate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plugin = yield Plugin_1.Plugin.findById(req.params.id);
        if (!plugin) {
            res.status(404).json({ success: false, error: 'App token not found.' });
            return;
        }
        plugin.revoked = true;
        yield plugin.save();
        const synonyms = plugin.synonyms.slice();
        synonyms.push(plugin._id);
        const newPlugin = yield new Plugin_1.Plugin({
            ownerId: plugin.ownerId,
            domain: plugin.domain,
            synonyms, // Latest token keeps links to all previous tokens
        }).save();
        res.json({
            success: true,
            data: Object.assign(Object.assign({}, sanitize(newPlugin)), { synonyms: newPlugin.synonyms }),
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Unknown server error.' });
    }
});
exports.regenerate = regenerate;
/**
 * Generate JWT token for the plugin using a plugin id.
 * @param req Request
 * @param res Response
 * @returns Promise<void>
 */
const getJwtToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(0, mongoose_1.isValidObjectId)(req.params.id)) {
            res.status(400).json({ success: false, error: 'Invalid token.' });
            return;
        }
        const plugin = yield Plugin_1.Plugin.findById(req.params.id);
        if (!plugin) {
            res.status(404).json({ success: false, error: 'App token not found.' });
            return;
        }
        const token = (0, auth_1.signPluginToken)(plugin, secrets_1.SESSION_SECRET, '12h');
        res.json({
            success: true,
            data: token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Unknown server error.' });
    }
});
exports.getJwtToken = getJwtToken;
const getConfig = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const config = yield ICEServerConfig_1.IceServerConfig.findOne({
            pluginId: req.params.id,
        });
        if (!config) {
            res.status(404).json({ success: false, error: 'ICE config not found.' });
            return;
        }
        res.json({
            success: true,
            data: req.user ? config : yield (0, iceServers_1.createTurnConfig)(config),
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Unknown server error.' });
    }
});
exports.getConfig = getConfig;
const setConfig = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const plugin = req.params.id
            ? yield Plugin_1.Plugin.findById(req.params.id)
            : // TODO: Remove this once we can config turn servers per token
                yield Plugin_1.Plugin.findOne({
                    ownerId: req.user.id,
                    revoked: false,
                });
        if (!plugin) {
            res.status(404).json({ success: false, error: 'App token not found.' });
            return;
        }
        let config = yield ICEServerConfig_1.IceServerConfig.findOne({
            pluginId: plugin.id,
        });
        if (!config) {
            config = new ICEServerConfig_1.IceServerConfig({
                ownerId: req.user.id,
                pluginId: plugin.id,
            });
        }
        else if (config.mode !== req.body.mode) {
            yield config.delete();
            config = new ICEServerConfig_1.IceServerConfig({
                ownerId: req.user.id,
                pluginId: plugin.id,
            });
        }
        config.set(req.body);
        yield config.save();
        res.json({
            success: true,
            data: config,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Unknown server error.' });
    }
});
exports.setConfig = setConfig;
//# sourceMappingURL=controller.js.map