"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3_CONTENT_LINK_EXPIRATION = exports.SENDER_EMAIL = exports.RECEIVER_EMAIL = exports.S3_CONTENT_BUCKET = exports.SUBSCRIPTION_STATUSES = exports.USER_PACKAGES = exports.USER_ROLES = exports.LINKEDIN_CALLBACK_URL = exports.FACEBOOK_CALLBACK_URL = exports.GOOGLE_CALLBACK_URL = exports.SUPPORT_URL = exports.API_BASE_URL = exports.AUTH_LANDING = exports.RECOVERY_LANDING = exports.CONFIRMATION_LANDING = exports.UNSUBSCRIBE_LANDING = exports.APP_SOCKET_USER_SPACE = exports.APP_SOCKET_CLIENT_SPACE = exports.APP_SOCKET_PATH = exports.APP_PORT = exports.JWT_EXPIRATION_REC_REQ = exports.JWT_EXPIRATION_PLUGIN = exports.JWT_EXPIRATION = exports.TEST = exports.STAGING = exports.PRODUCTION = exports.NODE_ENV = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV === 'TEST') {
    dotenv_1.default.config({ path: '../.env.test' });
}
else {
    dotenv_1.default.config();
}
exports.NODE_ENV = process.env.NODE_ENV;
exports.PRODUCTION = 'production';
exports.STAGING = 'staging';
exports.TEST = 'test';
exports.JWT_EXPIRATION = '7d';
exports.JWT_EXPIRATION_PLUGIN = '2h';
exports.JWT_EXPIRATION_REC_REQ = '365d'; // TODO-> change to one day (1d)
exports.APP_PORT = 9100;
exports.APP_SOCKET_PATH = '/stats';
exports.APP_SOCKET_CLIENT_SPACE = '/clients';
exports.APP_SOCKET_USER_SPACE = '/users';
// Redis
// export const APP_REDIS_PLUGINS_CLIENT_IDS_ACTIVE = 'plugins:client_ids:active';
exports.UNSUBSCRIBE_LANDING = '';
exports.CONFIRMATION_LANDING = 'https://screenapp.io/auth';
exports.RECOVERY_LANDING = 'https://screenapp.io/auth';
exports.AUTH_LANDING = process.env['AUTH_LANDING'];
exports.API_BASE_URL = process.env['API_BASE_URL'];
exports.SUPPORT_URL = process.env['SUPPORT_URL'];
exports.GOOGLE_CALLBACK_URL = process.env['GOOGLE_CALLBACK_URL'];
exports.FACEBOOK_CALLBACK_URL = process.env['FACEBOOK_CALLBACK_URL'];
exports.LINKEDIN_CALLBACK_URL = process.env['LINKEDIN_CALLBACK_URL'];
exports.USER_ROLES = ['user', 'admin', 'owner'];
exports.USER_PACKAGES = ['FREE_LOGGEDIN', 'STANDARD', 'PREMIUM'];
exports.SUBSCRIPTION_STATUSES = ['pending', 'inactive', 'active']; // DO NOT CHANGE THE ORDER
exports.S3_CONTENT_BUCKET = 'starter-content';
exports.RECEIVER_EMAIL = process.env['RECEIVER_EMAIL'] || 'support@meetrix.io';
exports.SENDER_EMAIL = process.env['SENDER_EMAIL'] || 'hello@meetrix.io';
exports.S3_CONTENT_LINK_EXPIRATION = 15 * 60; // 15 min
//# sourceMappingURL=settings.js.map