"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.specRouter = void 0;
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        swagger: '2.0',
        info: {
            title: 'Webrtc Monitor',
            version: '1.0.0',
        },
        basePath: '/v1',
        // https://github.com/Surnet/swagger-jsdoc/issues/61
        securityDefinitions: {
            bearerAuth: {
                in: 'header',
                type: 'apiKey',
                name: 'Authorization',
            },
        },
    },
    apis: ['./src/api/v1/**/*.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
const router = express_1.default.Router();
router.use('/', swagger_ui_express_1.default.serve);
router.get('/', swagger_ui_express_1.default.setup(swaggerSpec));
exports.specRouter = router;
//# sourceMappingURL=index.js.map