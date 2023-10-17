"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const settings_1 = require("../config/settings");
const logLevel = () => {
    switch (settings_1.NODE_ENV) {
        case settings_1.PRODUCTION:
            return 'info';
        case settings_1.TEST:
            return 'no_logging';
        default:
            return 'debug';
    }
};
const logger = (0, winston_1.createLogger)({
    format: winston_1.format.combine(
    // Use these two instead for JSON format
    // format.timestamp(),
    // format.json()
    winston_1.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }), winston_1.format.printf((info) => {
        return `[${info.timestamp}] [${info.level.toUpperCase()}] ${info.message}`;
    })),
    transports: [new winston_1.transports.Console({ level: logLevel() })],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map