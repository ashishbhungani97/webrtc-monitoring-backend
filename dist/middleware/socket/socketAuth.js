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
exports.socketUserAuth = exports.socketPluginAuth = void 0;
const logger_1 = __importDefault(require("../../util/logger"));
const auth_1 = require("../../util/auth");
const User_1 = require("../../models/User");
const socketPluginAuth = (socket, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (socket.handshake.auth && socket.handshake.auth.token) {
        try {
            const decodedToken = yield (0, auth_1.verify)(socket.handshake.auth.token);
            const clientId = (_b = (_a = socket === null || socket === void 0 ? void 0 : socket.handshake) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.clientId;
            if (!decodedToken) {
                throw new Error(`decodedToken not provided decodedToken: ${decodedToken}`);
            }
            if (!clientId) {
                throw new Error(`clientId not provided clientId: ${clientId}`);
            }
            socket.auth = Object.assign(Object.assign({}, decodedToken), { clientId });
            logger_1.default.info(`plugin socket authenticated domain: ${decodedToken.domain}`);
            // const user = await User.findOne({ email: decodedToken.email });
            // socket.user = user;
            next();
        }
        catch (error) {
            logger_1.default.error(`socket authentication failed: `, error);
            next(new Error('Authentication error'));
        }
    }
    else {
        next(new Error('Authentication error'));
    }
});
exports.socketPluginAuth = socketPluginAuth;
const socketUserAuth = (socket, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (socket.handshake.auth && socket.handshake.auth.token) {
        try {
            const decodedToken = yield (0, auth_1.verify)(socket.handshake.auth.token);
            socket.auth = decodedToken;
            logger_1.default.info(`user socket authenticated email: ${decodedToken.email}`);
            const user = yield User_1.User.findOne({ email: decodedToken.email });
            socket.user = user;
            next();
        }
        catch (error) {
            logger_1.default.error(`socket authentication failed: `, error);
            next(new Error('Authentication error'));
        }
    }
    else {
        next(new Error('Authentication error'));
    }
});
exports.socketUserAuth = socketUserAuth;
//# sourceMappingURL=socketAuth.js.map