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
exports.setupPassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = __importDefault(require("passport-local"));
const User_1 = require("../models/User");
const logger_1 = __importDefault(require("../util/logger"));
const LocalStrategy = passport_local_1.default.Strategy;
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => {
    User_1.User.findById(id, (err, user) => {
        done(err, user);
    });
});
const findUserOrCreateUser = (profile, accessToken, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { provider, id, name, emails, photos, displayName } = profile;
        const { givenName, middleName, familyName } = name;
        // Sometimes, a name might be empty.
        const fullName = displayName ||
            [givenName, familyName].filter((s) => !!s).join(' ') ||
            middleName ||
            '';
        const email = emails[0].value;
        //let email = '';
        let picture = null;
        //if (emails && emails[0]) {
        //}
        if (photos && photos[0]) {
            picture = photos[0].value;
        }
        // 1. Lets see whether there are accounts for the any of the emails
        let user = yield User_1.User.findOne({ email });
        logger_1.default.info(`Found registered user with email: ${email}`);
        if (user)
            return user;
        // 2. If we could not find any account with email, lets see whether there is an account with provider id
        // we dont want this for now
        //user = await User.findOne({ 'profile.provider': provider, 'profile.providerId': id });
        //logger.info(`Found registered user with ${provider} id: ${id}`);
        //if (user) return user;
        // 3. If we cannot find a user at all, we should create one
        logger_1.default.info('User not found. Creating a new user');
        user = new User_1.User({
            email,
            profile: {
                name: fullName,
                picture,
                provider,
                providerId: id,
            },
        });
        user.tokens.push({
            kind: provider,
            accessToken,
            refreshToken,
        });
        yield user.save();
        return user;
    }
    catch (error) {
        throw error;
    }
});
/**
 * Sign in using Email and Password.
 */
passport_1.default.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
}, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return done(null, false, {
                message: 'Email not registered',
            });
        }
        if (!(yield user.authenticate(password))) {
            return done(null, false, {
                message: 'Invalid credentials',
            });
        }
        done(null, user);
    }
    catch (error) {
        return done(error);
    }
})));
const setupPassport = (app) => {
    app.use(passport_1.default.initialize());
};
exports.setupPassport = setupPassport;
//# sourceMappingURL=passport.js.map