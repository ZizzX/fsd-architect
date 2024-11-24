"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    static configure(config) {
        Logger.config = { ...Logger.config, ...config };
    }
    static info(message) {
        if (Logger.config.silent || Logger.config.level === 'error')
            return;
        console.log(chalk_1.default.blue('ℹ'), chalk_1.default.blue(message));
    }
    static success(message) {
        if (Logger.config.silent || Logger.config.level === 'error')
            return;
        console.log(chalk_1.default.green('✔'), chalk_1.default.green(message));
    }
    static warn(message) {
        if (Logger.config.silent || Logger.config.level === 'error')
            return;
        console.log(chalk_1.default.yellow('⚠'), chalk_1.default.yellow(message));
    }
    static error(message) {
        if (Logger.config.silent)
            return;
        const errorMessage = message instanceof Error ? message.message : message;
        console.error(chalk_1.default.red('✖'), chalk_1.default.red(errorMessage));
    }
    static debug(message) {
        if (Logger.config.silent || Logger.config.level !== 'debug')
            return;
        console.log(chalk_1.default.gray('🔍'), chalk_1.default.gray(message));
    }
}
exports.Logger = Logger;
Logger.config = {
    level: 'info',
    silent: false,
};
