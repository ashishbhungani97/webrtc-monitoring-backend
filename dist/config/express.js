"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupExpress = void 0;
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const body_parser_1 = __importDefault(require("body-parser"));
const settings_1 = require("./settings");
const secrets_1 = require("./secrets");
const passport_1 = require("./passport");
const logger_1 = __importDefault(require("../util/logger"));
const setupExpress = (app) => {
    app.set('port', settings_1.APP_PORT);
    const corsOptions = {
        origin: (origin, callback) => {
            if (!origin)
                return callback();
            const match = origin.match(new RegExp(secrets_1.CORS_REGEX)) ? true : false;
            callback(null, match);
        },
    };
    (0, passport_1.setupPassport)(app);
    app.use(['/v1/plugin/init/*', '/v1/recording'], (0, cors_1.default)());
    app.use((0, cors_1.default)(corsOptions));
    app.use(body_parser_1.default.json({ limit: '2mb' }));
    app.use(body_parser_1.default.urlencoded({ limit: '2mb', extended: true }));
    app.use((0, compression_1.default)());
    app.use((0, morgan_1.default)('[:method] :url :status :res[content-length] - :response-time ms', {
        stream: {
            write: (text) => {
                logger_1.default.info(text.substring(0, text.lastIndexOf('\n')));
            },
        },
    }));
};
exports.setupExpress = setupExpress;
//# sourceMappingURL=express.js.map