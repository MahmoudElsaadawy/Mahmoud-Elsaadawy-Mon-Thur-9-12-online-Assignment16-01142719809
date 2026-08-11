"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = void 0;
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_connection_1 = require("./DB/mongoose.connection");
const error_exceptions_1 = require("./utils/error.exceptions");
const auth_controller_1 = __importStar(require("./modules/auth/auth.controller"));
const user_controller_1 = __importStar(require("./modules/user/user.controller"));
const redis_connection_1 = require("./DB/redis.connection");
const bootstrap = async () => {
    const app = (0, express_1.default)();
    const port = process.env.PORT;
    await (0, mongoose_connection_1.connectDB)();
    await redis_connection_1.redisClient.connect();
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)("dev"));
    app.use(auth_controller_1.routes.base, auth_controller_1.default);
    app.use(user_controller_1.routes.base, user_controller_1.default);
    app.use(error_exceptions_1.globalErrorHandler);
    app.listen(port, () => {
        console.log(chalk_1.default.bgGreen(`Server is running on port ${port}`));
    });
};
exports.bootstrap = bootstrap;
