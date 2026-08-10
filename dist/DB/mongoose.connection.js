"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const chalk_1 = __importDefault(require("chalk"));
const connectDB = async () => {
    const dbUri = process.env.DB_LOCAL_URI;
    const dbVersion = process.env.DB_LOCAL_VERSION;
    if (dbUri) {
        await mongoose_1.default
            .connect(dbUri, {
            dbName: `Assignment${dbVersion}`,
            serverSelectionTimeoutMS: 3000,
        })
            .then(() => {
            console.log(chalk_1.default.bgGreen("Connected to database successfully"));
        })
            .catch((err) => {
            console.log(chalk_1.default.bgRed(err.message));
        });
    }
};
exports.connectDB = connectDB;
