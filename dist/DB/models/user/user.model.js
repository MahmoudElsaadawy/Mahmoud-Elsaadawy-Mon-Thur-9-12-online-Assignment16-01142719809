"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_types_1 = require("./user.types");
const hashing_1 = require("../../../utils/security/hashing");
const encryption_1 = require("../../../utils/security/encryption");
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        set: function (value) {
            return (0, encryption_1.encrypt)(value);
        },
        get: function (value) {
            return (0, encryption_1.decrypt)(value);
        }
    },
    age: {
        type: Number,
    },
    gender: {
        type: Number,
        enum: user_types_1.GenderEnum,
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    confirmedAt: {
        type: Date,
    },
    changedCredentialsAt: {
        type: Date,
    },
    provider: {
        type: Number,
        enum: user_types_1.ProviderEnum,
        default: user_types_1.ProviderEnum.system,
    },
    role: {
        type: Number,
        enum: user_types_1.RoleEnum,
        default: user_types_1.RoleEnum.user,
    },
    profilePic: {
        type: String,
    },
    coverPics: {
        type: [String],
        default: [],
    },
    bio: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        getters: true
    },
    toObject: {
        getters: true
    },
});
UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await (0, hashing_1.hash)(this.password);
    }
});
const userModel = mongoose_1.default.model("User", UserSchema);
exports.default = userModel;
