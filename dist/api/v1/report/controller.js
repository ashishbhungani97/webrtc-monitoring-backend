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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSummary = exports.getSummary2 = exports.postParticipantsStats = exports.getParticipantStats = exports.getRoomStats = exports.postRoomStats = exports.getReport = void 0;
const mongoose_1 = require("mongoose");
const Participant_1 = require("../../../models/Participant");
const Room_1 = require("../../../models/Room");
const Stat_1 = require("../../../models/Stat");
const ErrorEvent_1 = require("../../../models/ErrorEvent");
const getReport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({});
});
exports.getReport = getReport;
const postRoomStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check for a roomName
        if (!req.body.roomName) {
            res.status(400).json({ success: false, error: 'No roomName set' });
            console.log('No roomName set', req.path, req.body);
            return;
        }
        // Check for a roomJid
        if (!req.body.roomJid) {
            res.status(400).json({ success: false, error: 'No roomJid set' });
            console.log('No roomJid set', req.path, req.body);
            return;
        }
        // Check for a event
        if (!req.body.event) {
            res.status(400).json({ success: false, error: 'No event set' });
            console.log('No event set', req.path, req.body);
            return;
        }
        if (req.body.event == 'create') {
            const payload = {
                roomName: req.body.roomName,
                roomJid: req.body.roomJid,
                faulty: 0,
                created: new Date(),
                destroyed: null,
            };
            const saved = yield new Room_1.Room(payload).save();
            res.status(201).json({ success: true, data: saved });
            return;
        }
        else if (req.body.event == 'destroy') {
            const room = yield Room_1.Room.find({ roomJid: req.body.roomJid })
                .sort({
                created: 'desc',
            })
                .limit(1)
                .cursor()
                .next();
            if (!room) {
                res
                    .status(401)
                    .json({ success: false, data: null, message: 'Room not found' });
                return;
            }
            room.destroyed = new Date();
            yield room.save();
            res.status(201).json({ success: true, data: null });
            return;
        }
        else {
            res.status(400).json({ success: false, error: 'Unidentified event' });
            console.log('Unidentified event', req.path, req.body);
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});
exports.postRoomStats = postRoomStats;
const getRoomStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, offset, roomId, roomJid, startTime, endTime, sortBy, direction, } = req.query;
        const limitNumber = parseInt(limit || '10', 10);
        const offsetNumber = parseInt(offset || '0', 10);
        const sortOrder = sortBy.toString();
        const rooms = yield Room_1.Room.find(Object.assign(Object.assign(Object.assign({}, (roomId && { _id: roomId })), (roomJid && { roomJid: roomJid })), (startTime &&
            endTime && {
            createdAt: {
                $gte: new Date(startTime),
                $lt: new Date(endTime),
            },
        })))
            .sort({ [sortOrder]: direction })
            .limit(limitNumber)
            .skip(offsetNumber)
            .populate('participants');
        const totalRooms = yield Room_1.Room.find(Object.assign(Object.assign(Object.assign({}, (roomId && { _id: roomId })), (roomJid && { roomJid: roomJid })), (startTime &&
            endTime && {
            createdAt: {
                $gte: new Date(startTime),
                $lt: new Date(endTime),
            },
        })));
        let totalMinutes = 0;
        let totalParticipants = 0;
        for (const room of rooms) {
            if (room.destroyed) {
                totalMinutes += Math.round((room.destroyed.getTime() - room.created.getTime()) / 60000);
                totalParticipants += room.participants;
            }
        }
        res.status(200).json({
            success: true,
            data: {
                rooms,
                total: totalRooms.length,
                totalMinutes,
                totalParticipants,
            },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});
exports.getRoomStats = getRoomStats;
const getParticipantStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, offset, roomId, participantId, participantJid, startTime, endTime, sortBy, direction, } = req.query;
        const limitNumber = parseInt(limit || '10', 10);
        const offsetNumber = parseInt(offset || '0', 10);
        const sortOrder = sortBy.toString();
        const participants = yield Participant_1.Participant.find(Object.assign(Object.assign(Object.assign(Object.assign({}, (participantId && {
            _id: participantId,
        })), (participantJid && { participantJid: participantJid })), (roomId && { roomId: roomId })), (startTime &&
            endTime && {
            createdAt: {
                $gte: new Date(startTime),
                $lt: new Date(endTime),
            },
        })))
            .populate('roomId')
            .sort({ [sortOrder]: direction })
            .limit(limitNumber)
            .skip(offsetNumber);
        const totalDataCount = yield Participant_1.Participant.find().count(Object.assign(Object.assign(Object.assign({}, (roomId && { roomId: roomId })), (participantJid && { participantJid: participantJid })), (startTime &&
            endTime && {
            createdAt: {
                $gte: new Date(startTime),
                $lt: new Date(endTime),
            },
        })));
        res.status(200).json({
            success: true,
            data: { participants: participants, total: totalDataCount },
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});
exports.getParticipantStats = getParticipantStats;
const postParticipantsStats = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Check for a Required parameters
        if (!req.body.bareJid || !req.body.roomUserJid || !req.body.roomJid) {
            res
                .status(400)
                .json({ success: false, error: 'Required parameters not set' });
            console.log('Required parameters not set', req.path, req.body);
            return;
        }
        if (req.body.event == 'join') {
            const room = yield Room_1.Room.find({ roomJid: req.body.roomJid })
                .sort({
                created: 'desc',
            })
                .limit(1)
                .cursor()
                .next();
            if (!room) {
                res
                    .status(401)
                    .json({ success: false, data: null, message: 'Room not found' });
                return;
            }
            const oneDaysBeforeNow = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000);
            const participant = yield Participant_1.Participant.find({
                participantJid: req.body.bareJid,
                participantRoomJid: req.body.roomUserJid,
                joined: { $gte: oneDaysBeforeNow },
            })
                .sort({
                created: 'desc',
            })
                .limit(1)
                .cursor()
                .next();
            if (participant) {
                res.status(401).json({
                    success: false,
                    data: null,
                    message: 'Duplicate participant join event',
                });
                return;
            }
            const payload = {
                participantName: req.body.displayName
                    ? req.body.displayName
                    : 'Felllow Jitster',
                participantJid: req.body.bareJid,
                participantRoomJid: req.body.roomUserJid,
                roomName: req.body.roomName,
                roomJid: req.body.roomJid,
                roomId: room._id,
                faulty: 0,
                joined: new Date(),
                left: null,
            };
            const saved = yield new Participant_1.Participant(payload).save();
            res.status(201).json({ success: true, data: saved });
            return;
        }
        else if (req.body.event == 'leave') {
            const participant = yield Participant_1.Participant.find({
                participantJid: req.body.bareJid,
                participantRoomJid: req.body.roomUserJid,
            })
                .sort({
                joined: 'desc',
            })
                .limit(1)
                .cursor()
                .next();
            if (!participant) {
                res.status(401).json({
                    success: false,
                    data: null,
                    message: 'Participant not found',
                });
                return;
            }
            participant.left = new Date();
            yield participant.save();
            res.status(201).json({ success: true, data: null });
            return;
        }
        else if (req.body.event == 'nick-change') {
            const participant = yield Participant_1.Participant.find({
                participantJid: req.body.bareJid,
                participantRoomJid: req.body.roomUserJid,
            })
                .sort({
                joined: 'desc',
            })
                .limit(1)
                .cursor()
                .next();
            if (!participant) {
                res.status(401).json({
                    success: false,
                    data: null,
                    message: 'Participant not found',
                });
                return;
            }
            participant.participantName = req.body.displayName
                ? req.body.displayName
                : 'Felllow Jitster';
            yield participant.save();
            res.status(201).json({ success: true, data: null });
            return;
        }
        else {
            res.status(400).json({ success: false, error: 'Unidentified event' });
            console.log('Unidentified event', req.path, req.body);
            return;
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});
exports.postParticipantsStats = postParticipantsStats;
const getSummary2 = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { participantId, startTime, endTime } = req.query;
        console.log(participantId);
        const summary = yield Stat_1.Stat.aggregate()
            .match(Object.assign(Object.assign(Object.assign({}, (participantId && {
            participantId: new mongoose_1.Types.ObjectId(participantId),
        })), { event: {
                $in: ['onicecandidate', 'onsignalingstatechange', 'mediaInfo'],
            } }), (startTime &&
            endTime && {
            createdAt: {
                $gte: new Date(startTime),
                $lt: new Date(endTime),
            },
        })))
            .sort({ createdAt: 'ASC' })
            .group({
            _id: '$event',
            total: { $sum: 1 },
            icecandidates: { $push: '$data.candidate' },
            data: { $last: '$data' },
        });
        const summaryPayload = {
            icecandidates: summary.find((obj) => {
                return obj._id === 'onicecandidate';
            }),
            sdp: summary.find((obj) => {
                return obj._id === 'onsignalingstatechange';
            }),
            mediaInfo: summary.find((obj) => {
                return obj._id === 'mediaInfo';
            }),
        };
        res.status(200).json({
            success: true,
            data: summaryPayload,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});
exports.getSummary2 = getSummary2;
const getSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, offset, roomId, participantId, startTime, endTime, sortBy, direction, } = req.query;
        const limitNumber = parseInt(limit || '10', 10);
        const offsetNumber = parseInt(offset || '0', 10);
        const sortOrder = sortBy.toString();
        const errorEvents = yield ErrorEvent_1.ErrorEvent.find(Object.assign(Object.assign(Object.assign({}, (participantId && {
            participantId: participantId,
        })), (roomId && { roomId: roomId })), (startTime &&
            endTime && {
            createdAt: {
                $gte: new Date(startTime),
                $lt: new Date(endTime),
            },
        })))
            .populate('roomId')
            .populate('participantId')
            .sort({ [sortOrder]: direction })
            .limit(limitNumber)
            .skip(offsetNumber)
            .lean();
        for (const errorEvent of errorEvents) {
            if (errorEvent.errorType == 'qualityLimitationFactor' &&
                errorEvent.errorValue == 'bandwidth') {
                errorEvent.errorDescription = [
                    'Goto menu->performance-> adjust for best performance',
                    'Change network to a better connection',
                    'Ensure no high bandwidth applications are running in parallel',
                    'Update your browser to the latest version',
                    'Use recommended browsers i.e. Chrome',
                ];
            }
            else if (errorEvent.errorType == 'qualityLimitationFactor' &&
                errorEvent.errorValue == 'cpu') {
                errorEvent.errorDescription = [
                    'Goto menu->performance-> adjust for best performance',
                    'Ensure no high CPU consuming applications are running in parallel',
                    'Update your browser to the latest version',
                    'Use recommended browsers i.e. Chrome',
                ];
            }
        }
        const totalDataCount = yield ErrorEvent_1.ErrorEvent.find().count(Object.assign(Object.assign(Object.assign({}, (participantId && {
            participantId: participantId,
        })), (roomId && { roomId: roomId })), (startTime &&
            endTime && {
            createdAt: {
                $gte: new Date(startTime),
                $lt: new Date(endTime),
            },
        })));
        res.status(200).json({
            success: true,
            data: errorEvents,
            totalDataCount,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});
exports.getSummary = getSummary;
//# sourceMappingURL=controller.js.map