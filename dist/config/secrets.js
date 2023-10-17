"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CORS_REGEX = exports.SMTP_PASSWORD = exports.SMTP_USER = exports.SMTP_HOST = exports.SESSION_SECRET = exports.MONGO_URI = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const settings_1 = require("./settings");
const logger_1 = __importDefault(require("../util/logger"));
if (!fs_1.default.existsSync('.env')) {
    logger_1.default.info('No .env file found, looking for variables in environment.');
}
dotenv_1.default.config();
const requiredSecrets = [
    'SESSION_SECRET',
    'MONGO_DATABASE',
    'MONGO_HOST',
    'MONGO_PORT',
    // 'REDIS_HOST',
    // 'REDIS_PORT',
    'CORS_REGEX',
];
if (settings_1.NODE_ENV === settings_1.PRODUCTION || settings_1.NODE_ENV === settings_1.STAGING) {
    requiredSecrets.push(...['MONGO_USERNAME', 'MONGO_PASSWORD']);
}
const missingSecrets = requiredSecrets.filter((s) => !process.env[s]);
if (missingSecrets.length > 0) {
    missingSecrets.forEach((ms) => logger_1.default.error(`Env variable ${ms} is missing.`));
    process.exit(1);
}
exports.MONGO_URI = settings_1.NODE_ENV === settings_1.PRODUCTION || settings_1.NODE_ENV === settings_1.STAGING
    ? `mongodb+srv://ashishbhungani:FfFWhGBU1Sdm@cluster0.gep5p.mongodb.net/${process.env.MONGO_DATABASE}`
    : `mongodb+srv://ashishbhungani:FfFWhGBU1Sdm@cluster0.gep5p.mongodb.net/${process.env.MONGO_DATABASE}`;
// export const REDIS_URI = `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;
exports.SESSION_SECRET = process.env['SESSION_SECRET'];
exports.SMTP_HOST = process.env['SMTP_HOST'];
exports.SMTP_USER = process.env['SMTP_USER'];
exports.SMTP_PASSWORD = process.env['SMTP_PASSWORD'];
exports.CORS_REGEX = process.env['CORS_REGEX'];
//# sourceMappingURL=secrets.js.map