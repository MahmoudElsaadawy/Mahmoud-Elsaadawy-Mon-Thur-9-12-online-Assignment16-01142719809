"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = exports.signupService = void 0;
const user_model_1 = __importDefault(require("../../DB/models/user/user.model"));
const error_exceptions_1 = require("../../utils/error.exceptions");
const success_response_1 = require("../../utils/success.response");
const user_types_1 = require("../../DB/models/user/user.types");
const hashing_1 = require("../../utils/security/hashing");
class AuthService {
    async signup(data) {
        const { name, email, password, phone, age, gender, role, bio } = req.body;
        const userExist = await user_model_1.default.findOne({ email });
        if (userExist) {
            throw new error_exceptions_1.ConflictException("User Already Exists");
        }
        const userCreated = await user_model_1.default.create({
            name,
            email,
            password,
            phone,
            age,
            gender,
            role,
            bio,
        });
        (0, success_response_1.successResponse)({
            res,
            message: "User Created Successfully",
            data: userCreated,
        });
    }
}
const signupService = async (req, res) => {
};
exports.signupService = signupService;
const loginService = async (req, res) => {
    const { email, password } = req.body;
    const user = await user_model_1.default.findOne({ email });
    if (!user) {
        throw new error_exceptions_1.UnauthorizedException("Invalid email or password");
    }
    if (user.provider > user_types_1.ProviderEnum.system) {
        throw new error_exceptions_1.BadRequestException("use social login");
    }
    const matchedPassword = await (0, hashing_1.compare)(password, user.password);
    if (!matchedPassword) {
        throw new error_exceptions_1.UnauthorizedException("Invalid email or password");
    }
    const userObj = user.toObject();
    const { _id, __v, isOnline, isActive, password: _password, createdAt, updatedAt, ...safeUserData } = userObj;
    (0, success_response_1.successResponse)({
        res,
        message: "logged in successfully",
        data: safeUserData,
    });
};
exports.loginService = loginService;
