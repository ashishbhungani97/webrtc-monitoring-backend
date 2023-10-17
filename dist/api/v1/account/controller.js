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
exports.verify = exports.deleteAccount = exports.password = exports.getProfile = exports.postProfile = exports.clearFirstTimeUserFlag = exports.reset = exports.resetPassword = exports.forgot = exports.login = exports.register = exports.refresh = void 0;
/* eslint-disable @typescript-eslint/camelcase */
const crypto_1 = __importDefault(require("crypto"));
const passport_1 = __importDefault(require("passport"));
const validator_1 = __importDefault(require("validator"));
const settings_1 = require("../../../config/settings");
const User_1 = require("../../../models/User");
const error_1 = require("../../../util/error");
const auth_1 = require("../../../util/auth");
const logger_1 = __importDefault(require("../../../util/logger"));
const mail_1 = require("../../../util/mail");
const log = console.log;
// Refresh
const refresh = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        if (!user) {
            //res.sendStatus(401);
            res.status(401).json({
                success: false,
                data: null,
                message: 'Unauthorized action.',
            });
            return;
        }
        // res.status(200).json({ token: signToken(user) });
        res.status(200).json({
            success: true,
            data: { token: (0, auth_1.signToken)(user) },
            message: 'Token issued.',
        });
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Something went wrong. Please try again later.',
        });
        next(error);
    }
});
exports.refresh = refresh;
// Register
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if (!validator.isEmpty(req.body.name)) {
        //   res.status(422).json({
        //     success: false,
        //     data: null,
        //     message: 'Please enter your name correctly.'
        //   });
        //   return;
        // }
        if (!validator_1.default.isEmail(req.body.email)) {
            res.status(422).json({
                success: false,
                data: null,
                message: 'Please enter a valid email address.',
            });
            return;
        }
        if (!validator_1.default.isLength(req.body.password, { min: 8 })) {
            res.status(422).json({
                success: false,
                data: null,
                message: 'Password must be at least 8 characters long.',
            });
            return;
        }
        if (!/[A-Z]/.test(req.body.password)) {
            res.status(422).json({
                success: false,
                data: null,
                message: 'Password must be contain at least one upper case letter.',
            });
            return;
        }
        if (!/[a-z]/.test(req.body.password)) {
            res.status(422).json({
                success: false,
                data: null,
                message: 'Password must be contain at least one lower case letter.',
            });
            return;
        }
        if (!/[0-9]/.test(req.body.password)) {
            res.status(422).json({
                success: false,
                data: null,
                message: 'Password must be contain at least one nemrical character.',
            });
            return;
        }
        if (!/\W/.test(req.body.password)) {
            res.status(422).json({
                success: false,
                data: null,
                message: 'Password must be contain at least one special character.',
            });
            return;
        }
        req.body.email = validator_1.default.normalizeEmail(req.body.email, {
            gmail_remove_dots: false,
        });
        const selectedUser = yield User_1.User.findOne({ email: req.body.email });
        if (!selectedUser) {
            const randValueHex = (len) => {
                return crypto_1.default
                    .randomBytes(Math.ceil(len / 2))
                    .toString('hex')
                    .slice(0, len);
            };
            const emailToken = randValueHex(32);
            const user = new User_1.User({
                email: req.body.email,
                password: req.body.password,
                profile: {
                    name: req.body.name,
                    picture: null,
                    provider: 'manual',
                    providerId: null,
                    companyName: req.body.companyName,
                    contactNumber: req.body.contactNumber,
                },
                tag: {
                    tagId: null,
                    title: null,
                    status: null,
                    createdAt: null,
                },
                emailToken,
                isVerified: false,
            });
            yield user.save();
            const clientName = user.profile.name;
            const transporter = (0, mail_1.getTransporter)();
            const mailOptions = (0, mail_1.getMailOptions)({
                subject: 'Confirm Your Email Address - Meetrix WebRTC Monitoring Application',
                to: `<${user.email}>`,
                template: 'emailVerification',
                context: {
                    clientName,
                    emailToken,
                    API_BASE_URL: settings_1.API_BASE_URL,
                    AUTH_LANDING: settings_1.AUTH_LANDING,
                    SUPPORT_URL: settings_1.SUPPORT_URL,
                },
            });
            transporter.sendMail(mailOptions, (err, data) => {
                if (err) {
                    return log('Error occurs', err.message);
                }
                return log('Email sent to the user successfully.');
            });
            res.status(200).json({
                success: true,
                // data: { emailToken },
                message: 'Confirmation email has been sent successfully. Please check your inbox to proceed.',
            });
            return;
        }
        if (!selectedUser.isVerified) {
            res.status(200).json({
                success: true,
                data: null,
                message: 'You have an unverifed account with us. Please verify your account & signin.',
            });
            return;
        }
        else if (selectedUser.isVerified) {
            res.status(200).json({
                success: true,
                data: null,
                message: 'You have a verified account with us. Please signin or reset your credentials to continue.',
            });
            return;
        }
    }
    catch (error) {
        logger_1.default.error(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Registration failed. Please try again in few minutes.',
        });
        next(error);
    }
});
exports.register = register;
// Login
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // if (!req.body.email || !req.body.password) {
        //   //res.status(403).json(formatError('Username or Password incorrect. Please check and try again.'));
        //   res.status(403).json(formatError('Invalid credentials'));
        //         return;
        // }
        if (!((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.email) || !((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.password)) {
            res.status(403).json({
                errors: [{ msg: 'Invalid credentials' }],
            });
            return;
        }
        req.body.email = validator_1.default.normalizeEmail(req.body.email, {
            gmail_remove_dots: false,
        });
        passport_1.default.authenticate('local', (err, user, info) => __awaiter(void 0, void 0, void 0, function* () {
            if (err)
                throw err;
            // Let's check username or password is matched
            if (!user.email || !user.password) {
                // return res.status(403).json(formatError(info.message));
                return res.status(403).json({
                    success: false,
                    data: null,
                    message: 'Username or password incorrect. If you forgot your credentials, please reset now.',
                });
            }
            // Let's check user is verifed in the system
            if (!user.isVerified) {
                //Let's generate a string for emailToken
                const randValueHex = (len) => {
                    return crypto_1.default
                        .randomBytes(Math.ceil(len / 2))
                        .toString('hex')
                        .slice(0, len);
                };
                const emailToken = randValueHex(32);
                // Let's update new emailToken and verification status for existing users
                (user.emailToken = emailToken),
                    (user.isVerified = false),
                    yield user.save();
                const clientName = user.profile.name;
                const transporter = (0, mail_1.getTransporter)();
                const mailOptions = (0, mail_1.getMailOptions)({
                    subject: 'Confirm Your Email Address - Meetrix WebRTC Monitoring Application',
                    to: `<${user.email}>`,
                    template: 'emailVerification',
                    context: {
                        clientName,
                        emailToken,
                        API_BASE_URL: settings_1.API_BASE_URL,
                        AUTH_LANDING: settings_1.AUTH_LANDING,
                        SUPPORT_URL: settings_1.SUPPORT_URL,
                    },
                });
                transporter.sendMail(mailOptions, (err, data) => {
                    if (err) {
                        return log('Error occurs');
                    }
                    return log('Email sent to the user successfully.');
                });
                res.status(403).json({
                    success: false,
                    // data: { emailToken },
                    message: 'You should complete your signin process. We have sent you a new confirmation email. Please check your inbox & confirm your account to continue.',
                });
                return;
            }
            if (user.isVerified) {
                // res.status(200).json({ token: signToken(user) });
                res.status(200).json({
                    success: true,
                    data: { token: (0, auth_1.signToken)(user) },
                    message: 'Login Successful. Redirecting...',
                });
            }
        }))(req, res, next);
    }
    catch (error) {
        console.log(error);
        logger_1.default.error(error);
        res.status(500).json({
            success: false,
            data: null,
            message: 'Something went wrong. Please try again later.',
        });
        next(error);
    }
});
exports.login = login;
// Forgot Password (Password Reset)
const forgot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.email) {
            res.status(422).json({
                errors: [{ msg: 'Invalid data' }],
            });
            return;
        }
        let { email } = req.body;
        email = validator_1.default.normalizeEmail(email, {
            gmail_remove_dots: false,
        });
        const user = yield User_1.User.findOne({ email });
        if (!user) {
            res.status(404).json({
                errors: [
                    {
                        msg: 'Email not found',
                    },
                ],
            });
            return;
        }
        const emailToken = crypto_1.default.randomBytes(16).toString('hex');
        user.passwordResetToken = emailToken;
        user.passwordResetExpires = new Date(Date.now() + 60 * 60 * 1000); // ms
        yield user.save();
        const clientName = user.profile.name;
        const transporter = (0, mail_1.getTransporter)();
        const mailOptions = (0, mail_1.getMailOptions)({
            subject: 'Reset Your Password - Meetrix WebRTC Monitoring Application',
            to: `<${user.email}>`,
            template: 'passwordReset',
            context: {
                clientName,
                emailToken,
                API_BASE_URL: settings_1.API_BASE_URL,
                AUTH_LANDING: settings_1.AUTH_LANDING,
                SUPPORT_URL: settings_1.SUPPORT_URL,
            },
        });
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return log(err);
            }
            return log('Email sent to the user successfully. ');
        });
        res.status(201).json({
            success: true,
            message: 'Password reset link has been sent to your mail successfully. It will be valid for next 60 minutes.',
        });
    }
    catch (error) {
        logger_1.default.error('Error occurs while sending email.');
        res.status(500).json({
            success: true,
            data: null,
            message: 'Something went wrong. Please try again later.',
        });
        next(error);
    }
});
exports.forgot = forgot;
// Password Reset Auth
const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ passwordResetToken: req.query.token });
        if (!user) {
            // res.redirect(`${AUTH_LANDING}/#/resetpasswordtoken_expired`);
            res.status(401).json({
                success: false,
                data: null,
                message: 'The password reset link is already used or expired. Please try again.',
            });
            return;
        }
        // res.redirect(`${AUTH_LANDING}/#/resetpassword?token=${user.passwordResetToken}`);
        res.status(200).json({
            success: true,
            data: { passwordResetToken: user.passwordResetToken },
            message: 'Reset successful. Redirecting...',
        });
    }
    catch (error) {
        logger_1.default.error('Something went wrong.');
        res.status(500).json({
            success: false,
            data: null,
            message: 'Something went wrong. Please try again later.',
        });
        next(error);
    }
});
exports.resetPassword = resetPassword;
// Password Reset Confirmation
const reset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!validator_1.default.isLength(req.body.password, { min: 8 })) {
            res.status(422).json({
                success: false,
                message: 'Password must be at least 8 characters long.',
            });
            return;
        }
        if (!/[A-Z]/.test(req.body.password)) {
            res.status(422).json({
                success: false,
                message: 'Password must be contain at least one upper case letter.',
            });
            return;
        }
        if (!/[a-z]/.test(req.body.password)) {
            res.status(422).json({
                success: false,
                message: 'Password must be contain at least one lower case letter.',
            });
            return;
        }
        if (!/[0-9]/.test(req.body.password)) {
            res.status(422).json({
                success: false,
                message: 'Password must be contain at least one nemrical character.',
            });
            return;
        }
        if (!/\W/.test(req.body.password)) {
            res.status(422).json({
                success: false,
                message: 'Password must be contain at least one special character.',
            });
            return;
        }
        if (req.body.password !== req.body.confirm) {
            res.status(422).json({
                success: false,
                message: 'Passwords do not match. Please check and enter the same password.',
            });
            return;
        }
        if (!validator_1.default.isHexadecimal(req.params.token)) {
            res.status(422).json({
                success: false,
                message: 'Token expired or something went wrong. Please try again.',
            });
            return;
        }
        const user = yield User_1.User.findOne({
            passwordResetToken: req.params.token,
        })
            .where('passwordResetExpires')
            .gt(Date.now());
        if (!user) {
            res.redirect(`${settings_1.AUTH_LANDING}/resetpasswordtoken_expired`);
            res.status(401).json({
                success: false,
                message: 'The password reset link is already used or expired. Please try again.',
            });
            return;
        }
        user.password = req.body.password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        yield user.save();
        const clientName = user.profile.name;
        const transporter = (0, mail_1.getTransporter)();
        const mailOptions = (0, mail_1.getMailOptions)({
            subject: 'Password Reset Successful - Meetrix WebRTC Monitoring Application',
            to: `<${user.email}>`,
            template: 'passwordResetConfirmation',
            context: {
                clientName,
                API_BASE_URL: settings_1.API_BASE_URL,
                AUTH_LANDING: settings_1.AUTH_LANDING,
                SUPPORT_URL: settings_1.SUPPORT_URL,
            },
        });
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return log('Error occurs');
            }
            return log('Email sent to the user successfully.');
        });
        // res.status(201).json(SUCCESSFUL_RESPONSE);
        res.status(201).json({
            success: true,
            data: null,
            message: 'Password reset successful. Sign in back to access your account.',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Something went wrong. Please try again later.',
        });
        next(error);
    }
});
exports.reset = reset;
const clearFirstTimeUserFlag = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        user.isFirstTimeUser = false;
        yield user.save();
        res.status(200).json({
            success: true,
            data: null,
            message: 'Profile successfully updated.',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Something went wrong. Please try again later.',
        });
        next(error);
    }
});
exports.clearFirstTimeUserFlag = clearFirstTimeUserFlag;
// Post Profile
const postProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        // Do not set email
        // user.email = req.body.email;
        const { name, gender, location, domain, picture, provider, providerId, companyName, contactNumber, } = req.body;
        user.profile = Object.assign(Object.assign({}, user.profile), { name,
            gender,
            location,
            domain,
            picture,
            provider,
            providerId,
            companyName,
            contactNumber });
        if (req.body.picture) {
            const imgBuffer = Buffer.from(req.body.picture, 'base64');
            const emailHex = Buffer.from(user.email).toString('hex');
            const key = `profile-pictures/${emailHex}`; // Replace profile picture if exists
            const imgPath = '';
            user.profile.picture = imgPath;
        }
        if (!!req.body.password && req.body.password.length > 0) {
            // Validate old password, if only there is an old password
            if (user.password &&
                !(yield user.authenticate(req.body.oldPassword || ''))) {
                res.status(422).json({
                    success: false,
                    data: null,
                    message: 'Current password entered is incorrect.',
                });
                return;
            }
            // Validate new password
            if (!validator_1.default.isLength(req.body.password, { min: 8 })) {
                res.status(422).json({
                    success: false,
                    data: null,
                    message: 'Password must be at least 8 characters long.',
                });
                return;
            }
            if (!/[A-Z]/.test(req.body.password)) {
                res.status(422).json({
                    success: false,
                    data: null,
                    message: 'Password must be contain at least one upper case letter.',
                });
                return;
            }
            if (!/[a-z]/.test(req.body.password)) {
                res.status(422).json({
                    success: false,
                    data: null,
                    message: 'Password must be contain at least one lower case letter.',
                });
                return;
            }
            if (!/[0-9]/.test(req.body.password)) {
                res.status(422).json({
                    success: false,
                    data: null,
                    message: 'Password must be contain at least one nemrical character.',
                });
                return;
            }
            if (!/\W/.test(req.body.password)) {
                res.status(422).json({
                    success: false,
                    data: null,
                    message: 'Password must be contain at least one special character.',
                });
                return;
            }
            user.password = req.body.password;
            //Password change notification
            const clientName = user.profile.name;
        }
        yield user.save();
        //res.status(200).json(user.format());
        res.status(200).json({
            success: true,
            data: null,
            message: 'Profile successfully updated.',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Something went wrong. Please try again later.',
        });
        next(error);
    }
});
exports.postProfile = postProfile;
// Get Profile
const getProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        //res.status(200).json(user.format());
        res.status(200).json({
            success: true,
            data: Object.assign(Object.assign({ id: user.id, isVerified: user.isVerified, isFirstTimeUser: user.isFirstTimeUser, hasPasswordSet: !!user.password, email: user.email, role: user.role, package: user.package, limitedPackage: user.limitedPackage, trialsConsumed: user.trialsConsumed, features: user.features, avatar: user.gravatar, profile: user.profile }, (0, auth_1.getSubscriptionStatus)(user)), { tag: user.tag }),
            message: 'Get profile successful.',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Something went wrong. Please try again later.',
        });
        next(error);
    }
});
exports.getProfile = getProfile;
// Change Password
const password = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validationErrors = [];
        if (!validator_1.default.isLength(req.body.password, { min: 8 })) {
            validationErrors.push('Password must be at least 8 characters long\n');
        }
        if (!/[A-Z]/.test(req.body.password)) {
            validationErrors.push('Password must be contain at least one upper case letter.Password must be at least 8 characters long\n');
        }
        if (!/[a-z]/.test(req.body.password)) {
            validationErrors.push('Password must be contain at least one lower case letter\n');
        }
        if (!/[0-9]/.test(req.body.password)) {
            validationErrors.push('Password must be contain at least one nemrical character\n');
        }
        if (!/\W/.test(req.body.password)) {
            validationErrors.push('Password must be contain at least one special character\n');
        }
        if (req.body.password !== req.body.confirm) {
            validationErrors.push('Passwords do not match');
        }
        if (validationErrors.length) {
            res.status(422).json((0, error_1.formatError)(...validationErrors));
            return;
        }
        const user = req.user;
        user.password = req.body.password;
        yield user.save();
        // res.status(200).json(SUCCESSFUL_RESPONSE);
        res.status(200).json({
            success: true,
            data: null,
            message: 'Changing password successful.',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Something went wrong. Please try again later.',
        });
        next(error);
    }
});
exports.password = password;
// Delete Account
const deleteAccount = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User_1.User.deleteOne({ _id: req.user._id.toString() });
        //res.status(200).json(SUCCESSFUL_RESPONSE);
        res.status(200).json({
            success: true,
            data: null,
            message: 'Deleting profile successful.',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Something went wrong. Please try again later.',
        });
        next(error);
    }
});
exports.deleteAccount = deleteAccount;
// User account verification & auto signin at first attempt
const verify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ emailToken: req.query.token });
        if (!user) {
            res.status(401).json({
                success: false,
                data: null,
                message: 'The verification link is already used or expired. Please try again.',
            });
            return;
        }
        user.emailToken = null;
        user.isVerified = true;
        yield user.save();
        const clientName = user.profile.name;
        const transporter = (0, mail_1.getTransporter)();
        const mailOptions = (0, mail_1.getMailOptions)({
            subject: 'Account Successfully Verified - Meetrix WebRTC Monitoring Application',
            to: `<${user.email}>`,
            template: 'emailVerificationConfirmation',
            context: {
                clientName,
                API_BASE_URL: settings_1.API_BASE_URL,
                AUTH_LANDING: settings_1.AUTH_LANDING,
                SUPPORT_URL: settings_1.SUPPORT_URL,
            },
        });
        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                return log('Error occurs', err.message);
            }
            return log('Email sent to the user successfully.');
        });
        res.status(200).json({
            success: true,
            data: { token: (0, auth_1.signToken)(user) },
            message: 'Verification successful. Redirecting...',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            data: null,
            message: 'Something went wrong. Please try again later.',
        });
        log('Error occurs while sending email.');
        next(error);
    }
});
exports.verify = verify;
// Resend Verification
// export const resendVerification = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const getUserById = await User.findOne({ id: req.body.id });
//     const checkVerificationStatus = getUserById.isVerified === true;
//     if (checkVerificationStatus) {
//       res.status(422).json({
//         success: false,
//         data: null,
//         message: 'Already Verified.'
//       });
//       return;
//     }
//     // we create a random string to send as the token for email verification
//     const randValueHex = (len: number): string => {
//       return crypto.randomBytes(Math.ceil(len / 2)).toString('hex').slice(0, len);
//     };
//     const emailToken = randValueHex(128);
//     const user = new User({
//       emailToken,
//       isVerified: false,
//     });
//     await user.save();
//     const transporter = getTransporter();
//     const mailOptions = getMailOptions({
//       subject: 'Confirm Your Email Address - ScreenApp.IO',
//       to: `<${user.email}>`,
//       template: 'emailVerification',
//       context: {
//         emailToken,
//         API_BASE_URL,
//         AUTH_LANDING
//       }
//     });
//     transporter.sendMail(mailOptions, (err, data) => {
//       if (err) {
//         return log('Error occurs');
//       }
//       return log('Email sent to the user successfully.');
//       // res.status(201).json({ token: signToken(user) });
//     });
//     res.status(200).json({
//       success: true,
//       data: { emailToken },
//       message: 'Confirmation email has been sent successfully. Please check your inbox to proceed.'
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       data: null,
//       message: 'Registration failed. Please try again in few minutes.'
//     });
//     next(error);
//   }
// };
//# sourceMappingURL=controller.js.map