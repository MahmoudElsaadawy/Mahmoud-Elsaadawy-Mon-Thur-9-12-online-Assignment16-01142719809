"use strict";
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
const auth_controller_1 = __importDefault(require("./modules/auth/auth.controller"));
const bootstrap = async () => {
    const app = (0, express_1.default)();
    const port = process.env.PORT;
    await (0, mongoose_connection_1.connectDB)();
    app.use(express_1.default.json());
    app.use((0, morgan_1.default)("dev"));
    app.use("/auth", auth_controller_1.default);
    app.use(error_exceptions_1.globalErrorHandler);
    app.listen(port, () => {
        console.log(chalk_1.default.bgGreen(`Server is running on port ${port}`));
    });
};
exports.bootstrap = bootstrap;
