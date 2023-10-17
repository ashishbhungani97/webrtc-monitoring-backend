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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPluginUser = exports.isPluginOwnerOrUser = exports.hasRoleOrHigher = exports.isAuthenticated = exports.handleMissing = exports.handleErrors = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../util/logger"));
const secrets_1 = require("../config/secrets");
const settings_1 = require("../config/settings");
const error_1 = require("../util/error");
const User_1 = require("../models/User");
const Plugin_1 = require("../models/Plugin");
const handleErrors = (error, _req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
_next) => {
    logger_1.default.error(error.stack);
    res.status(500).json((0, error_1.formatError)('Server Error'));
};
exports.handleErrors = handleErrors;
const handleMissing = (_req, res) => {
    res.sendStatus(404);
};
exports.handleMissing = handleMissing;
/**
 * Main authenticator middleware. This rejects plugin authentication tokens.
 *
 * @param req
 * @param res
 * @param next
 * @returns
 */
const isAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.headers.authorization) {
            res.sendStatus(401);
            return;
        }
        const token = req.headers.authorization.split('Bearer ')[1];
        let jwtInfo;
        try {
            jwtInfo = jsonwebtoken_1.default.verify(token, secrets_1.SESSION_SECRET);
        }
        catch (error) {
            logger_1.default.error(error);
            res.sendStatus(401);
            return;
        }
        // Reject *plugin* authentication tokens
        if ((_a = jwtInfo) === null || _a === void 0 ? void 0 : _a.plugin) {
            throw new Error('Plugin authentication tokens cannot be used to log-in.');
        }
        const userDoc = yield User_1.User.findOne({ email: jwtInfo.email });
        if (!userDoc) {
            res.sendStatus(401);
            return;
        }
        req.user = userDoc;
        next();
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(401).json({
            success: false,
            error: 'unauthorized',
        });
    }
});
exports.isAuthenticated = isAuthenticated;
const hasRoleOrHigher = (level) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.headers.authorization) {
                res.sendStatus(401);
                console.log('Role: No auth', req.path);
                return;
            }
            const token = req.headers.authorization.split('Bearer ')[1];
            const { email } = jsonwebtoken_1.default.verify(token, secrets_1.SESSION_SECRET);
            if (!email) {
                res.sendStatus(403);
                console.log('Role: No email', req.path);
                return;
            }
            const user = yield User_1.User.findOne({ email });
            if (!(user === null || user === void 0 ? void 0 : user.id)) {
                res.sendStatus(403);
                console.log('Role: No user', req.path, email);
                return;
            }
            req.user = user;
            if (settings_1.USER_ROLES.indexOf(req.user.role) >= settings_1.USER_ROLES.indexOf(level)) {
                next();
            }
            else {
                res.sendStatus(403);
                console.log('Role: No permissions', req.path, user);
            }
        }
        catch (error) {
            logger_1.default.error(error);
            res.sendStatus(401);
        }
    });
};
exports.hasRoleOrHigher = hasRoleOrHigher;
/**
 * Allows using a plugin for both the owner and the user
 * @returns
 */
const isPluginOwnerOrUser = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.headers.authorization) {
                res.sendStatus(401);
                console.log('Plugin: No auth', req.path);
                return;
            }
            const token = req.headers.authorization.split('Bearer ')[1];
            const result = jsonwebtoken_1.default.verify(token, secrets_1.SESSION_SECRET);
            const isPluginToken = Boolean(result.plugin);
            const pluginId = req.params.id || result.plugin || '';
            // Load default plugin if no plugin is specified
            const plugin = pluginId
                ? yield Plugin_1.Plugin.findById(pluginId)
                : yield Plugin_1.Plugin.findOne({
                    ownerId: result.sub,
                    revoked: false,
                });
            if (!(plugin === null || plugin === void 0 ? void 0 : plugin.id)) {
                res.status(404).json({ success: false, error: 'App token not found.' });
                console.log('Plugin: No plugin', req.path);
                return;
            }
            req.params.id = plugin.id;
            if (isPluginToken) {
                if (plugin.revoked) {
                    res
                        .status(404)
                        .json({ success: false, error: 'App token not found.' });
                    console.log('Plugin: Revoked plugin', req.path);
                    return;
                }
                req.user = null;
                next();
            }
            else {
                // User token
                const user = yield User_1.User.findById(result.sub);
                if (!(user === null || user === void 0 ? void 0 : user.id)) {
                    res.status(404).json({ success: false, error: 'Account not found.' });
                    console.log('Plugin: No user', req.path, result);
                    return;
                }
                if (plugin.ownerId !== user.id) {
                    res
                        .status(403)
                        .json({ success: false, error: 'Forbidden: not your token.' });
                    console.log('Plugin: No permissions', req.path, user.email);
                    return;
                }
                req.user = user;
                next();
            }
        }
        catch (error) {
            logger_1.default.error(error);
            res.sendStatus(401);
        }
    });
};
exports.isPluginOwnerOrUser = isPluginOwnerOrUser;
/**
 * Allows using a plugin for a user
 * @returns
 */
const isPluginUser = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (!req.headers.authorization) {
                res
                    .status(401)
                    .json({ success: false, error: 'No authentication token provided.' });
                console.log('Plugin: No auth', req.path);
                return;
            }
            const token = req.headers.authorization.split('Bearer ')[1];
            const result = jsonwebtoken_1.default.verify(token, secrets_1.SESSION_SECRET);
            const isPluginToken = Boolean(result.plugin);
            if (!isPluginToken) {
                res.status(403).json({ success: false, error: 'Invalid token' });
                console.log('Plugin: Invalid token', req.path);
                return;
            }
            const pluginId = req.params.id || result.plugin || '';
            // Load default plugin if no plugin is specified
            const plugin = pluginId
                ? yield Plugin_1.Plugin.findById(pluginId)
                : yield Plugin_1.Plugin.findOne({
                    ownerId: result.sub,
                    // revoked: false, // Doesn't matter if the plugin is revoked
                });
            if (!(plugin === null || plugin === void 0 ? void 0 : plugin.id)) {
                res.status(401).json({ success: false, error: 'App token not found.' });
                console.log('Plugin: No plugin', req.path);
                return;
            }
            if (plugin.revoked) {
                res
                    .status(403)
                    .json({ success: false, error: 'App token is expired.' });
                console.log('Plugin: Revoked', req.path);
                return;
            }
            req.body.clientId = req.headers['x-client-id'];
            req.body.pluginId = plugin.id;
            req.body.ownerId = plugin.ownerId;
            req.user = null;
            next();
        }
        catch (error) {
            console.log(error);
            res.status(401).json({ success: false, error: 'Authentication error.' });
        }
    });
};
exports.isPluginUser = isPluginUser;
//# sourceMappingURL=index.js.map