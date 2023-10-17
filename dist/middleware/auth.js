"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkedinAuthCallback = exports.linkedinAuth = exports.facebookAuthCallback = exports.facebookAuth = exports.googleAuthCallback = exports.googleAuth = void 0;
const passport_1 = __importDefault(require("passport"));
exports.googleAuth = passport_1.default.authenticate('google', {
    scope: ['profile', 'email'],
});
exports.googleAuthCallback = passport_1.default.authenticate('google');
exports.facebookAuth = passport_1.default.authenticate('facebook', {
    scope: ['email'],
});
exports.facebookAuthCallback = passport_1.default.authenticate('facebook');
exports.linkedinAuth = passport_1.default.authenticate('linkedin', {
    scope: ['r_emailaddress', 'r_liteprofile'],
});
exports.linkedinAuthCallback = passport_1.default.authenticate('linkedin');
//# sourceMappingURL=auth.js.map