"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.getSubscriptionStatus = exports.signSecondaryUserToken = exports.signPluginToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secrets_1 = require("../config/secrets");
const settings_1 = require("../config/settings");
const signToken = (user, secret = secrets_1.SESSION_SECRET, expiresIn = settings_1.JWT_EXPIRATION) => {
    return jsonwebtoken_1.default.sign({
        email: user.email,
        role: user.role,
    }, secret, {
        expiresIn: expiresIn,
        subject: user._id.toString(),
    });
};
exports.signToken = signToken;
const signPluginToken = (plugin, secret = secrets_1.SESSION_SECRET, expiresIn = settings_1.JWT_EXPIRATION_PLUGIN) => {
    return jsonwebtoken_1.default.sign({
        plugin: plugin._id,
        domain: plugin.domain,
    }, secret, {
        expiresIn,
        subject: plugin.ownerId,
    });
};
exports.signPluginToken = signPluginToken;
const signSecondaryUserToken = (recReq) => {
    return jsonwebtoken_1.default.sign({
        recordingRequestId: recReq._id.toString(),
    }, secrets_1.SESSION_SECRET, {
        expiresIn: settings_1.JWT_EXPIRATION_REC_REQ,
        subject: recReq.ownerId,
    });
};
exports.signSecondaryUserToken = signSecondaryUserToken;
/**
 * Find the subscription provider and the status
 */
function getSubscriptionStatus(user) {
    var _a, _b;
    // Take the best subscription status from both paypal and stripe
    // active > inactive > pending
    // stripe > paypal
    const stripeStatus = ((_a = user.stripe) === null || _a === void 0 ? void 0 : _a.subscriptionStatus) || 'pending';
    const paypalStatus = ((_b = user.paypal) === null || _b === void 0 ? void 0 : _b.subscriptionStatus) || 'pending';
    if (settings_1.SUBSCRIPTION_STATUSES.indexOf(paypalStatus) <=
        settings_1.SUBSCRIPTION_STATUSES.indexOf(stripeStatus)) {
        return { subscriptionStatus: stripeStatus, subscriptionProvider: 'stripe' };
    }
    else {
        return { subscriptionStatus: paypalStatus, subscriptionProvider: 'paypal' };
    }
}
exports.getSubscriptionStatus = getSubscriptionStatus;
const verify = (token) => {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(token, secrets_1.SESSION_SECRET, { algorithms: ['RS256', 'HS256'] }, (err, decoded) => {
            if (err) {
                return reject(err);
            }
            return resolve(decoded);
        });
    });
};
exports.verify = verify;
//# sourceMappingURL=auth.js.map