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
// import cros from 'cors'
(0, mongoose_1.setupMongoose)(secrets_1.MONGO_URI);
const app = (0, express_1.default)();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
(0, express_2.setupExpress)(app);
(0, routes_1.setupRoutesV1)(app);
// TODO: configure CORS
// app.use(
//   cors({
//     origin: true,
//   })
// );
app.use(middleware_1.handleMissing);
app.use(middleware_1.handleErrors);
exports.default = app;
//# sourceMappingURL=app.js.map