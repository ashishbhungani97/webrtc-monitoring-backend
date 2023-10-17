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
const logger_1 = __importDefault(require("../../../util/logger"));
const socketAuth_1 = require("../../../middleware/socket/socketAuth");
const webrtc_monitoring_common_lib_1 = require("@meetrix/webrtc-monitoring-common-lib");
const settings_1 = require("../../settings");
const Plugin_1 = require("../../../models/Plugin");
exports.default = (io) => {
    const userSpace = io.of(settings_1.APP_SOCKET_USER_SPACE);
    userSpace.use(socketAuth_1.socketUserAuth);
    userSpace.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
        logger_1.default.info(`socketId: ${socket.id} of ${socket.user.email} connected`);
        const plugins = yield Plugin_1.Plugin.find({
            ownerId: socket.user.id,
        });
        plugins.forEach((plugin) => {
            socket.join(plugin.domain);
        });
        socket.on(webrtc_monitoring_common_lib_1.SOCKET_ROOM_JOIN, (data) => {
            const { room } = data;
            if (room) {
                logger_1.default.info(`socket: ${socket.id} joined room ${room}`);
                socket.join(room);
            }
        });
    }));
};
//# sourceMappingURL=index.js.map