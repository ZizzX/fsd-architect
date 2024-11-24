"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
class Logger {
    static log(type, message) {
        if (this.config.silent)
            return;
        const colorMap = {
            info: chalk_1.default.blue,
            success: chalk_1.default.green,
            warn: chalk_1.default.yellow,
            error: chalk_1.default.red,
            debug: chalk_1.default.gray,
        };
        const prefix = {
            info: 'ℹ',
            success: '✔',
            warn: '⚠',
            error: '✖',
            debug: '🔍',
        };
        const colorFunc = colorMap[type];
        const prefixSymbol = prefix[type];
        if (Logger.config.level === 'error' && type !== 'error')
            return;
        if (type === 'error') {
            console.error(`${colorFunc(prefixSymbol)} ${colorFunc(message)}`);
            return;
        }
        console.log(`${colorFunc(prefixSymbol)} ${colorFunc(message)}`);
    }
    static configure(config) {
        Logger.config = { ...Logger.config, ...config };
    }
    static info(message) {
        if (Logger.config.silent || Logger.config.level === 'error') {
            this.error(message);
            return;
        }
        this.log('info', message);
    }
    static success(message) {
        if (Logger.config.silent || Logger.config.level === 'error') {
            this.error(message);
            return;
        }
        this.log('success', message);
    }
    static warn(message) {
        if (Logger.config.silent || Logger.config.level === 'error') {
            this.error(message);
            return;
        }
        this.log('warn', message);
    }
    static error(message) {
        const errorMessage = message instanceof Error ? message.message : message;
        this.log('error', errorMessage);
    }
    static debug(message) {
        if (Logger.config.silent || Logger.config.level === 'error') {
            this.error(message);
            return;
        }
        this.log('debug', message);
    }
}
exports.Logger = Logger;
Logger.config = {
    level: 'info',
    silent: false,
};
