"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const auth_1 = require("../../../middleware/auth");
const router = express_1.default.Router({ strict: false });
// `/google/callback` should be defined prior to `/google`
router.use('/google/callback', auth_1.googleAuthCallback, controller_1.authCallback);
/**
 * @swagger
 * /auth/google:
 *  get:
 *      description: Redirect to Google for authentication
 *      produces:
 *          - application/json
 *      responses:
 *          302:
 *              description: Redirect to Google
 *
 *
 */
router.use('/google', auth_1.googleAuth);
router.use('/facebook/callback', auth_1.facebookAuthCallback, controller_1.authCallback);
/**
 * @swagger
 * /auth/facebook:
 *  get:
 *      description: Redirect to Facebook for authentication
 *      produces:
 *          - application/json
 *      responses:
 *          302:
 *              description: Redirect to Facebook
 *
 *
 */
router.use('/facebook', auth_1.facebookAuth);
//router.use('/linkedin/callback', linkedinAuthCallback, authCallback);
/**
 * @swagger
 * /auth/linkedin:
 *  get:
 *      description: Redirect to LinkedIn for authentication
 *      produces:
 *          - application/json
 *      responses:
 *          302:
 *              description: Redirect to LinkedIn
 *
 *
 */
//router.use('/linkedin', linkedinAuth);
exports.authRouter = router;
//# sourceMappingURL=index.js.map