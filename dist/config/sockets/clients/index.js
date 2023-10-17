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
exports.dblogger = exports.insertErrorEvents = exports.updateFaultyRoomsUsers = void 0;
const webrtc_monitoring_common_lib_1 = require("@meetrix/webrtc-monitoring-common-lib");
const logger_1 = __importDefault(require("../../../util/logger"));
// import {
//   addActivePluginClient,
//   removePluginClient,
// } from '../../../util/redis/plugins';
const socketAuth_1 = require("../../../middleware/socket/socketAuth");
const settings_1 = require("../../settings");
const Stat_1 = require("../../../models/Stat");
const Participant_1 = require("../../../models/Participant");
const Room_1 = require("../../../models/Room");
const ErrorEvent_1 = require("../../../models/ErrorEvent");
const updateFaultyRoomsUsers = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.data && data.data.outbound) {
        for (const track of data.data.outbound) {
            if (track.kind == 'video' && track.qualityLimitationReason != 'none') {
                yield Room_1.Room.findByIdAndUpdate(data.roomId, { faulty: 1 });
                yield Participant_1.Participant.findByIdAndUpdate(data.participantId, { faulty: 1 });
                break;
            }
        }
    }
});
exports.updateFaultyRoomsUsers = updateFaultyRoomsUsers;
const insertErrorEvents = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.data && data.data.outbound) {
        for (const track of data.data.outbound) {
            if (track.kind == 'video' && track.qualityLimitationReason != 'none') {
                const payload = {
                    roomId: data.roomId,
                    participantId: data.participantId,
                    eventSourceType: 'track',
                    eventSourceId: track.id,
                    errorType: 'qualityLimitationFactor',
                    errorValue: track.qualityLimitationReason,
                    timestamp: new Date(track.timestamp),
                };
                const errorEvent = new ErrorEvent_1.ErrorEvent(payload);
                errorEvent.save();
            }
        }
    }
});
exports.insertErrorEvents = insertErrorEvents;
const dblogger = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const participant = yield Participant_1.Participant.findOne({
            participantRoomJid: data.participantJid,
        }).sort({
            joined: 'desc',
        });
        if (!participant) {
            logger_1.default.debug(`Participant not found: ${data.participantJid}`);
            return;
        }
        const payload = Object.assign(Object.assign({}, data), { participantId: participant._id, roomId: participant.roomId });
        yield (0, exports.updateFaultyRoomsUsers)(payload);
        yield (0, exports.insertErrorEvents)(payload);
        const stat = new Stat_1.Stat(payload);
        stat.save();
    }
    catch (error) {
        logger_1.default.error(error);
    }
});
exports.dblogger = dblogger;
exports.default = (io) => __awaiter(void 0, void 0, void 0, function* () {
    const clientSpace = io.of(settings_1.APP_SOCKET_CLIENT_SPACE);
    const userSpace = io.of(settings_1.APP_SOCKET_USER_SPACE);
    clientSpace.use(socketAuth_1.socketPluginAuth);
    clientSpace.on('connection', (socket) => {
        const { domain, clientId } = socket.auth;
        logger_1.default.info(`plugin with domain: ${domain}, socketId: ${socket.id}, clientId: ${clientId} connected`);
        const room = socket.auth.clientId;
        // addActivePluginClient({
        //   domain,
        //   clientId,
        // });
        userSpace.to(domain).emit(webrtc_monitoring_common_lib_1.SOCKET_CLIENT_JOINED, {
            clientId,
            domain,
        });
        socket.on(webrtc_monitoring_common_lib_1.SOCKET_REPORT_STATS, (data) => __awaiter(void 0, void 0, void 0, function* () {
            logger_1.default.debug(`emitting stats to room: ${room}`);
            userSpace.to(room).emit(webrtc_monitoring_common_lib_1.SOCKET_REPORT_STATS, data);
            (0, exports.dblogger)(data);
        }));
        socket.on(webrtc_monitoring_common_lib_1.SOCKET_CONNECTION_INFO, (data) => {
            logger_1.default.debug(`emitting connectionInfo to room: ${room}`);
            userSpace.to(room).emit(webrtc_monitoring_common_lib_1.SOCKET_CONNECTION_INFO, data);
            (0, exports.dblogger)(data);
        });
        socket.on(webrtc_monitoring_common_lib_1.SOCKET_OTHER_INFO, (data) => {
            logger_1.default.debug(`emitting other to room: ${room}`);
            userSpace.to(room).emit(webrtc_monitoring_common_lib_1.SOCKET_OTHER_INFO, data);
            (0, exports.dblogger)(data);
        });
        socket.on(webrtc_monitoring_common_lib_1.SOCKET_MEDIA_INFO, (data) => {
            logger_1.default.debug(`emitting mediaInfo to room: ${room}`);
            userSpace.to(room).emit(webrtc_monitoring_common_lib_1.SOCKET_MEDIA_INFO, data);
            (0, exports.dblogger)(data);
        });
        socket.on('disconnect', () => {
            // removePluginClient({
            //   domain,
            //   clientId,
            // });
            userSpace.to(domain).emit(webrtc_monitoring_common_lib_1.SOCKET_CLIENT_LEFT, {
                clientId,
                domain,
            });
        });
    });
});
//# sourceMappingURL=index.js.map