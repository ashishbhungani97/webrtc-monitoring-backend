"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransporter = exports.getMailOptions = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const secrets_1 = require("../config/secrets");
const settings_1 = require("../config/settings");
const getMailOptions = (options) => (Object.assign({ from: `"Meetrix WebRTC Monitoring Application" <${settings_1.SENDER_EMAIL}>`, to: settings_1.RECEIVER_EMAIL, subject: 'Welcome to Meetrix WebRTC Monitoring Application!' }, options));
exports.getMailOptions = getMailOptions;
const getTransporter = () => {
    const viewOptions = {
        viewEngine: {
            extName: '.handlebars',
            partialsDir: path_1.default.resolve(__dirname, '../../src/templates'),
            defaultLayout: false,
        },
        viewPath: path_1.default.resolve(__dirname, '../../src/templates'),
        extName: '.handlebars',
    };
    const transporter = nodemailer_1.default.createTransport({
        service: 'aws',
        host: secrets_1.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
            user: secrets_1.SMTP_USER,
            pass: secrets_1.SMTP_PASSWORD,
        },
    });
    transporter.use('compile', (0, nodemailer_express_handlebars_1.default)(viewOptions));
    return transporter;
};
exports.getTransporter = getTransporter;
//# sourceMappingURL=mail.js.map