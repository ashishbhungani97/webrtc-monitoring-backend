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
exports.getSessionSummary = exports.getSessions = exports.getSession = exports.postSession = void 0;
const TroubleshooterSession_1 = require("../../../models/TroubleshooterSession");
const postSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Client is guaranteed to set a clientId
        if (!req.body.clientId) {
            res.status(400).json({ success: false, error: 'No clientId set' });
            console.log('No clientId set', req.path, req.body);
            return;
        }
        // Auth should set pluginId from token
        if (!req.body.pluginId) {
            res.status(400).json({ success: false, error: 'No pluginId set' });
            console.log('No pluginId set', req.path, req.body);
            return;
        }
        // ownerId, pluginId, clientId
        const saved = yield new TroubleshooterSession_1.TroubleshooterSession(req.body).save();
        res.status(201).json({ success: true, data: saved });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});
exports.postSession = postSession;
const getSession = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield TroubleshooterSession_1.TroubleshooterSession.findById(req.params.id);
        if (!session) {
            res.status(404).json({
                success: false,
                error: 'Session not found',
            });
            return;
        }
        if (req.user.id !== session.ownerId) {
            res.status(403).json({
                success: false,
                error: 'You are not authorized to view this session',
            });
            return;
        }
        res.status(200).json({ success: false, data: session });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: 'Internal server error',
        });
    }
});
exports.getSession = getSession;
const getSessions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { limit, offset, pluginId, clientId, startTime, endTime, sortBy, direction, testId, } = req.query;
        const limitNumber = parseInt(limit || '10', 10);
        const offsetNumber = parseInt(offset || '0', 10);
        const sortOrder = sortBy.toString();
        const inputTextId = testId === null || testId === void 0 ? void 0 : testId.toString();
        const sessions = yield TroubleshooterSession_1.TroubleshooterSession.find(Object.assign(Object.assign(Object.assign(Object.assign({ ownerId: req.user.id }, (pluginId && { pluginId: pluginId })), (clientId && { clientId: clientId })), (testId && { _id: inputTextId })), (startTime &&
            endTime && {
            createdAt: {
                $gte: new Date(startTime),
                $lt: new Date(endTime),
            },
        })))
            .sort({ [sortOrder]: direction })
            .limit(limitNumber)
            .skip(offsetNumber);
        const totalDataCount = yield TroubleshooterSession_1.TroubleshooterSession.find().count(Object.assign(Object.assign(Object.assign(Object.assign({ ownerId: req.user.id }, (pluginId && { pluginId: pluginId })), (clientId && { clientId: clientId })), (testId && { _id: inputTextId })), (startTime &&
            endTime && {
            createdAt: {
                $gte: new Date(startTime),
                $lt: new Date(endTime),
            },
        })));
        res.status(200).json({
            success: true,
            data: { sessions: sessions, total: totalDataCount },
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
exports.getSessions = getSessions;
const getSessionSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { pluginId, clientId, startTime, endTime } = req.query;
        const summary = yield TroubleshooterSession_1.TroubleshooterSession.aggregate()
            .match(Object.assign(Object.assign(Object.assign({ ownerId: req.user.id }, (pluginId && { pluginId: pluginId })), (clientId && { clientId: clientId })), (startTime &&
            endTime && {
            createdAt: {
                $gte: new Date(startTime),
                $lt: new Date(endTime),
            },
        })))
            .project({
            tests: 1,
            createdAt: 1,
        })
            .group({
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            total: { $sum: 1 },
            passed: { $sum: { $toInt: '$tests.overall.status' } },
            browser: { $sum: { $toInt: '$tests.browser.status' } },
            microphone: { $sum: { $toInt: '$tests.microphone.status' } },
            camera: { $sum: { $toInt: '$tests.camera.status' } },
            network: { $sum: { $toInt: '$tests.network.status' } },
        });
        res.status(200).json({
            success: true,
            data: summary,
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
exports.getSessionSummary = getSessionSummary;
//# sourceMappingURL=controller.js.map