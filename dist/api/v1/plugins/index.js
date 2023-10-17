"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pluginRouter = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../../middleware");
const rateLimiterMemory_1 = __importDefault(require("../../../middleware/rateLimiterMemory"));
const controller_1 = require("./controller");
const router = express_1.default.Router();
/**
 * @swagger
 *
 * /plugins/{id}/ice-servers:
 *   get:
 *     description: Get ice-server configs for the specific token
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: "id"
 *         description: "Token/plugin Id"
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: ICE Server config
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: object
 *
 *       404:
 *         description: ICE config not found
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: ICE config not found.
 *
 *       500:
 *         description: Unknown error
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: Unknown server error.
 */
router.get('/:id/ice-servers', (0, middleware_1.isPluginOwnerOrUser)(), controller_1.getConfig);
/**
 * @swagger
 *
 * /plugins/{id}/ice-servers:
 *   put:
 *     description: Set ice-server configs for the specific token
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: "id"
 *         description: "Token/plugin Id"
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: "ice-servers"
 *         description: ICE Server config
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              mode:
 *                type: string
 *                example: static
 *              iceServers:
 *                type: array
 *                items:
 *                  type: object
 *                  properties:
 *                    urls:
 *                      type: string
 *                      example: turn:openrelay.metered.ca:80
 *                    username:
 *                      type: string
 *                      example: openrelayproject
 *                    credential:
 *                      type: string
 *                      example: openrelayproject
 *     responses:
 *       200:
 *         description: ICE Server config
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: object
 *
 *       404:
 *        description: App token not found
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: string
 *              example: false
 *            message:
 *              type: string
 *              example: App token not found.
 *
 *       500:
 *         description: Unknown error
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: Unknown server error.
 */
router.put('/:id/ice-servers', (0, middleware_1.hasRoleOrHigher)('user'), controller_1.setConfig);
// TODO: Remove these endpoints once we can config turn servers per token
/**
 * @swagger
 *
 * /plugins/ice-servers:
 *   get:
 *     description: Get ice-server configs for the default token
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Plugin details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: object
 *
 *       404:
 *         description: Plugin not found
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: App token not found.
 *       500:
 *         description: Unknown error
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: Unknown server error.
 */
router.get('/ice-servers', (0, middleware_1.isPluginOwnerOrUser)(), controller_1.getConfig);
/**
 * @swagger
 *
 * /plugins/ice-servers:
 *   put:
 *     description: Set ice-server configs for the default token
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: "ice-servers"
 *         description: ICE Server config
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *     responses:
 *       200:
 *         description: ICE Server config
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: object
 *
 *       404:
 *        description: App token not found
 *        schema:
 *          type: object
 *          properties:
 *            success:
 *              type: string
 *              example: false
 *            message:
 *              type: string
 *              example: App token not found.
 *
 *       500:
 *         description: Unknown error
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: Unknown server error.
 */
router.put('/ice-servers', (0, middleware_1.hasRoleOrHigher)('user'), controller_1.setConfig);
/**
 * @swagger
 *
 * /plugins/{id}:
 *   get:
 *     description: Get specific plugin (token details)
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: "id"
 *         description: "Token/plugin Id"
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plugin details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               properties:
 *                 _id:
 *                   type: string
 *                 domain:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *
 *       404:
 *         description: Plugin not found
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: App token not found.
 *       500:
 *         description: Unknown error
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: Unknown server error.
 */
router.get('/:id', (0, middleware_1.hasRoleOrHigher)('user'), controller_1.get);
/**
 * @swagger
 *
 * /plugins/{id}:
 *   delete:
 *     description: Revoke specific plugin (token details)
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: "id"
 *         description: "Token/plugin Id"
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Plugin details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               properties:
 *                 _id:
 *                   type: string
 *                 domain:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *
 *       404:
 *         description: Plugin not found
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: App token not found.
 *       500:
 *         description: Unknown error
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: Unknown server error.
 */
router.delete('/:id', (0, middleware_1.hasRoleOrHigher)('user'), controller_1.revoke);
/**
 * @swagger
 *
 * /plugins/{id}:
 *   patch:
 *     description: Regenerate token for specific plugin (token details)
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: "id"
 *         description: "Token/plugin Id"
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: New plugin details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               properties:
 *                 _id:
 *                   type: string
 *                 domain:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *
 *       404:
 *         description: Plugin not found
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: App token not found.
 *
 *       500:
 *         description: Unknown error
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: Unknown server error.
 */
router.patch('/:id', (0, middleware_1.hasRoleOrHigher)('user'), controller_1.regenerate);
/**
 * @swagger
 *
 * /plugins/{id}/token:
 *   post:
 *     description: Get JWT token for specific plugin
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: "id"
 *         description: "Token/plugin Id"
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: JWT token
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: string
 *       404:
 *         description: Plugin not found
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: App token not found.
 *       500:
 *         description: Unknown error
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: Unknown server error.
 */
router.post('/:id/token', rateLimiterMemory_1.default, controller_1.getJwtToken);
/**
 * @swagger
 *
 * /plugins:
 *   get:
 *     description: Get all plugins for the user (token details)
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Plugin details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   domain:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *
 *       500:
 *         description: Unknown error
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: Unknown server error.
 */
router.get('/', (0, middleware_1.hasRoleOrHigher)('user'), controller_1.getAll);
/**
 * @swagger
 *
 * /plugins:
 *   post:
 *     description: Create a new token
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: body
 *         name: plugin data
 *         description: Plugin details
 *         schema:
 *           type: object
 *           required:
 *             - domain
 *           properties:
 *             domain:
 *               type: string
 *     responses:
 *       201:
 *         description: Plugin details
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *               example: true
 *             data:
 *               properties:
 *                 _id:
 *                   type: string
 *                 domain:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *
 *       409:
 *         description: A plugin already exists for the domain
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: App token already exists.
 *
 *       500:
 *         description: Unknown error
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: string
 *               example: false
 *             message:
 *               type: string
 *               example: Unknown server error.
 */
router.post('/', (0, middleware_1.hasRoleOrHigher)('user'), controller_1.create);
exports.pluginRouter = router;
//# sourceMappingURL=index.js.map