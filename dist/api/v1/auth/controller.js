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
exports.authCallback = void 0;
const auth_1 = require("../../../util/auth");
const settings_1 = require("../../../config/settings");
const authCallback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            throw 'User not found';
        }
        const user = req.user;
        (user.isVerified = true), user.tag;
        (user.tag.tagId = null),
            (user.tag.title = null),
            (user.tag.status = null),
            (user.tag.createdAt = null),
            (user.accessToken = (0, auth_1.signToken)(user)),
            yield user.save();
        res.redirect(`${settings_1.AUTH_LANDING}/#/dashboard?token=${user.accessToken}`);
        /*res.status(200).json({
          success: true,
          data: { accessToken: user.accessToken },
          message: 'User authorized successfully. Redirecting...'
        });
        */
    }
    catch (error) {
        res.status(500).json({
            success: true,
            data: null,
            message: 'User authorization unsuccessful. Please try again.',
        });
        next(error);
    }
});
exports.authCallback = authCallback;
//# sourceMappingURL=controller.js.map