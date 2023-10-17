"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportRouter = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../../middleware");
const rateLimiterMemory_1 = __importDefault(require("../../../middleware/rateLimiterMemory"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
/**
 * @swagger
 *
 * /report/{domain}/{clientId}:
 *    get:
 *     description: Get active clients for a given domain name
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: "domain"
 *         description: "Domain name"
 *         in: path
 *         required: true
 *         type: string
 *       - name: "clientId"
 *         description: "Client Id"
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *          description: Get active clients for a given domain name
 *          schema:
 *              type: object
 *
 *       500:
 *          description: Unsuccessful Fetching User Profile
 *          schema:
 *              type: object
 *              properties:
 *                  success:
 *                      type: string
 *                      example: false
 *                  data:
 *                      type: string
 *                      example: null
 *                  message:
 *                      type: string
 *                      example: Something went wrong. Please try again later.
 */
router.get('/:domain/:clientId', (0, middleware_1.hasRoleOrHigher)('user'), controller_1.getReport);
router.post('/room', rateLimiterMemory_1.default, controller_1.postRoomStats);
router.get('/room', (0, middleware_1.hasRoleOrHigher)('user'), controller_1.getRoomStats);
router.post('/participant', rateLimiterMemory_1.default, controller_1.postParticipantsStats);
router.get('/participant', (0, middleware_1.hasRoleOrHigher)('user'), controller_1.getParticipantStats);
router.get('/summary', (0, middleware_1.hasRoleOrHigher)('user'), controller_1.getSummary);
exports.reportRouter = router;
//# sourceMappingURL=index.js.map