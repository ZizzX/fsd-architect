"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystem = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("./logger");
class FileSystem {
    static async createDirectory(dirPath) {
        try {
            await fs_extra_1.default.ensureDir(dirPath);
            logger_1.Logger.debug(`Created directory: ${dirPath}`);
        }
        catch (error) {
            logger_1.Logger.error(`Failed to create directory: ${dirPath}`);
            throw error;
        }
    }
    static async createFile(filePath, content) {
        try {
            await fs_extra_1.default.ensureFile(filePath);
            await fs_extra_1.default.writeFile(filePath, content);
            logger_1.Logger.debug(`Created file: ${filePath}`);
        }
        catch (error) {
            logger_1.Logger.error(`Failed to create file: ${filePath}`);
            throw error;
        }
    }
    static async fileExists(filePath) {
        try {
            return await fs_extra_1.default.pathExists(filePath);
        }
        catch (error) {
            logger_1.Logger.error(`Failed to check file existence: ${filePath}`);
            throw error;
        }
    }
    static async readFile(filePath) {
        try {
            return await fs_extra_1.default.readFile(filePath, 'utf-8');
        }
        catch (error) {
            logger_1.Logger.error(`Failed to read file: ${filePath}`);
            throw error;
        }
    }
    static resolvePath(...paths) {
        return path_1.default.resolve(...paths);
    }
}
exports.FileSystem = FileSystem;
