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
exports.User = exports.FileSystemEntity = exports.File = exports.Folder = void 0;
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const settings_1 = require("../config/settings");
const FileSystemEntity_1 = require("./FileSystemEntity");
const userSchema = new mongoose_1.default.Schema({
    email: { type: String, unique: true },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailToken: String,
    isVerified: Boolean,
    isFirstTimeUser: { type: Boolean, default: true },
    accessToken: String,
    role: { type: String, default: 'user', enum: settings_1.USER_ROLES },
    package: { type: String, default: 'FREE_LOGGEDIN', enum: settings_1.USER_PACKAGES },
    limitedPackage: {
        type: String,
        default: 'FREE_LOGGEDIN',
        enum: settings_1.USER_PACKAGES,
    },
    trialsConsumed: [String],
    facebook: String,
    linkedin: String,
    google: String,
    tokens: Array,
    profile: {
        name: String,
        gender: String,
        location: String,
        domain: String,
        picture: String,
        provider: String,
        providerId: String,
        companyName: String,
        contactNumber: String,
    },
    tag: {
        tagId: String,
        title: String,
        status: String,
        createdAt: String,
    },
    fileSystem: [FileSystemEntity_1.fileSystemEntitySchema],
    fileSystemSettings: { cloudSync: { type: Boolean, default: false } },
    features: { plugin: Boolean },
    stripe: {
        customerId: { type: String, default: null },
        priceId: { type: String, default: null },
        checkoutSessionId: { type: String, default: null },
        subscriptionId: { type: String, default: null },
        subscriptionItemId: { type: String, default: null },
        subscriptionStatus: { type: String, default: 'pending' },
    },
    paypal: {
        payerId: { type: String, default: null },
        emailAddress: { type: String, default: null },
        planId: { type: String, default: null },
        subscriptionId: { type: String, default: null },
        // pending: [APPROVAL_PENDING, APPROVED], active: [ACTIVE], inactive: [SUSPENDED, CANCELLED, EXPIRED]
        subscriptionStatus: { type: String, default: 'pending' },
    },
}, { timestamps: true });
const fileSystemEntityArray = userSchema.path('fileSystem');
exports.Folder = fileSystemEntityArray.discriminator('Folder', FileSystemEntity_1.folderSchema);
exports.File = fileSystemEntityArray.discriminator('File', FileSystemEntity_1.fileSchema);
exports.FileSystemEntity = mongoose_1.default.model('FileSystemEntity', FileSystemEntity_1.fileSystemEntitySchema);
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified('password'))
            return next();
        try {
            const salt = yield bcrypt_1.default.genSalt(10);
            user.password = yield bcrypt_1.default.hash(user.password, salt);
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
userSchema.methods = {
    authenticate: function (candidatePassword) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.password) {
                return bcrypt_1.default.compare(candidatePassword, this.password);
            }
            else {
                return false;
            }
        });
    },
    gravatar: function (size = 200) {
        if (!this.email) {
            return `https://gravatar.com/avatar/?s=${size}&d=retro`;
        }
        const md5 = crypto_1.default.createHash('md5').update(this.email).digest('hex');
        return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
    },
    format: function () {
        const result = {
            email: this.email,
            role: this.role,
            package: this.package,
            limitedPackage: this.limitedPackage,
            trialsConsumed: this.trialsConsumed,
            emailToken: this.emailToken,
            isVerified: this.isVerified,
            isFirstTimeUser: this.isFirstTimeUser,
            accessToken: this.accessToken,
            avatar: this.gravatar(),
            profile: {
                name: this.profile.name,
                gender: this.profile.gnder,
                location: this.profile.location,
                domain: this.profile.domain,
                picture: this.profile.picture,
                provider: this.profile.provider,
                providerId: this.profile.providerId,
                companyName: this.profile.companyName,
                contactNumber: this.profile.contactNumber,
            },
            tag: {
                tagId: this.tag.tagId,
                title: this.tag.title,
                status: this.tag.status,
                createdAt: this.tag.createdAt,
            },
            stripe: {
                customerId: this.stripe.customerId,
                priceId: this.stripe.priceId,
                checkoutSessionId: this.stripe.checkoutSessionId,
                subscriptionId: this.stripe.subscriptionId,
                subscriptionItemId: this.stripe.subscriptionItemId,
                subscriptionStatus: this.stripe.subscriptionStatus,
            },
            paypal: {
                payerId: this.paypal.payerId,
                emailAddress: this.paypal.emailAddress,
                planId: this.paypal.planId,
                subscriptionId: this.paypal.subscriptionId,
                subscriptionStatus: this.paypal.subscriptionStatus,
            },
        };
        return result;
    },
};
exports.User = mongoose_1.default.model('User', userSchema);
//# sourceMappingURL=User.js.map