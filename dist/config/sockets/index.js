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
const socket_io_1 = require("socket.io");
// import { createAdapter } from '@socket.io/redis-adapter';
const clients_1 = __importDefault(require("./clients"));
const users_1 = __importDefault(require("./users"));
// import { getNewClient } from '../../util/redis';
const settings_1 = require("../settings");
exports.default = (httpServer) => __awaiter(void 0, void 0, void 0, function* () {
    const io = new socket_io_1.Server(httpServer, {
        path: settings_1.APP_SOCKET_PATH,
        cors: {
            origin: true,
        },
    });
    // const pubClient = await getNewClient();
    // const subClient = await getNewClient();
    // io.adapter(createAdapter(pubClient, subClient));
    // // plugin space
    (0, clients_1.default)(io);
    // // user space
    (0, users_1.default)(io);
});
//# sourceMappingURL=index.js.map