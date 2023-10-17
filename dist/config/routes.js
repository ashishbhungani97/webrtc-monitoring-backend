"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupRoutesV1 = void 0;
const specs_1 = require("../api/v1/specs");
const account_1 = require("../api/v1/account");
const plugins_1 = require("../api/v1/plugins");
const users_1 = require("../api/v1/users");
const auth_1 = require("../api/v1/auth");
const misc_1 = require("../api/v1/misc");
const report_1 = require("../api/v1/report");
const troubleshooter_1 = require("../api/v1/troubleshooter");
const setupRoutesV1 = (app) => {
    app.use('/v1/spec', specs_1.specRouter);
    app.use('/v1/account', account_1.accountRouter);
    app.use('/v1/plugins', plugins_1.pluginRouter);
    app.use('/v1/users', users_1.usersRouter);
    app.use('/v1/auth', auth_1.authRouter);
    app.use('/v1/misc', misc_1.miscRouter);
    app.use('/v1/report', report_1.reportRouter);
    app.use('/v1/troubleshooter', troubleshooter_1.troubleshooterRouter);
};
exports.setupRoutesV1 = setupRoutesV1;
//# sourceMappingURL=routes.js.map