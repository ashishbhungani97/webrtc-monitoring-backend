"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const logger_1 = __importDefault(require("./util/logger"));
const sockets_1 = __importDefault(require("./config/sockets"));
const httpServer = (0, http_1.createServer)(app_1.default);
(0, sockets_1.default)(httpServer);
httpServer.listen(app_1.default.get('port'), () => {
    logger_1.default.info(`App is running at http://localhost:${app_1.default.get('port')}/v1/spec/ in ${app_1.default.get('env')} mode`);
});
exports.default = httpServer;
//# sourceMappingURL=server.js.map