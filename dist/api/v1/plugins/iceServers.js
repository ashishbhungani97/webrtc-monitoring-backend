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
exports.createTurnConfig = void 0;
const crypto_1 = __importDefault(require("crypto"));
const axios_1 = __importDefault(require("axios"));
const lodash_1 = require("lodash");
function iceServersFromSecret(iceServersConfig, timestamp = Date.now()) {
    return __awaiter(this, void 0, void 0, function* () {
        const time = Math.ceil(timestamp / 1000);
        const expiry = 8400;
        const username = `${time + expiry}`;
        const { secret } = iceServersConfig;
        const hash = crypto_1.default
            .createHmac('sha1', secret)
            .update(username)
            .digest('base64');
        const iceServer = {
            username,
            credential: hash,
            urls: [iceServersConfig.uri],
        };
        const config = { iceServers: [iceServer] };
        return config;
    });
}
function iceServersFromFetch(iceServersConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        const { url, method, headers, body, extract } = iceServersConfig;
        const result = (yield axios_1.default.request({ url, method, headers, data: body }))
            .data;
        // extract = path to iceServers array
        const iceServers = extract ? (0, lodash_1.get)(result, extract, null) : result;
        if (Array.isArray(iceServers.iceServers)) {
            return { iceServers };
        }
        return { iceServers: [iceServers] };
    });
}
const createTurnConfig = (iceServersConfig) => __awaiter(void 0, void 0, void 0, function* () {
    if (!iceServersConfig && !iceServersConfig.mode) {
        return null;
    }
    switch (iceServersConfig.mode) {
        case 'static': {
            return {
                iceServers: iceServersConfig.iceServers,
            };
        }
        case 'shared-secret': {
            return iceServersFromSecret(iceServersConfig);
        }
        case 'url': {
            try {
                return iceServersFromFetch(iceServersConfig);
            }
            catch (error) {
                console.error(error);
                return null;
            }
        }
        default: {
            return null;
        }
    }
});
exports.createTurnConfig = createTurnConfig;
//# sourceMappingURL=iceServers.js.map