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
const rate_limiter_flexible_1 = require("rate-limiter-flexible");
const rateLimiter = new rate_limiter_flexible_1.RateLimiterMemory({
    keyPrefix: 'middleware',
    points: 100,
    duration: 60, // per 1 minute by IP
});
const rateLimiterMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    rateLimiter
        .consume(req.ip)
        .then(() => {
        next();
    })
        .catch(() => {
        res.status(429).json({ success: false, error: 'Too Many Requests' });
    });
});
exports.default = rateLimiterMiddleware;
//# sourceMappingURL=rateLimiterMemory.js.map