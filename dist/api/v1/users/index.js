"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../../../middleware");
const controller_1 = require("./controller");
const router = express_1.default.Router();
router.get('/', (0, middleware_1.hasRoleOrHigher)('admin'), controller_1.index);
exports.usersRouter = router;
//# sourceMappingURL=index.js.map