"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_2 = require("./config/express");
const middleware_1 = require("./middleware");
const mongoose_1 = require("./config/mongoose");
const routes_1 = require("./config/routes");
const secrets_1 = require("./config/secrets");
const cors_1 = __importDefault(require("cors"));
(0, mongoose_1.setupMongoose)(secrets_1.MONGO_URI);
const app = (0, express_1.default)();
// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://reliable-tapioca-f7eba3.netlify.app');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
(0, express_2.setupExpress)(app);
(0, routes_1.setupRoutesV1)(app);
// TODO: configure CORS
app.use((0, cors_1.default)());
app.use(middleware_1.handleMissing);
app.use(middleware_1.handleErrors);
exports.default = app;
//# sourceMappingURL=app.js.map