"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_types_1 = require("./user.types");
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
});
const userModel = mongoose_1.default.model("User", UserSchema);
exports.default = userModel;
