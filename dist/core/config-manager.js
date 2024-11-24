"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigManager = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
class ConfigManager {
    static async loadConfig(projectConfig) {
        const configPath = path_1.default.join(projectConfig.root, projectConfig.configFile);
        try {
            if (await utils_1.FileSystem.fileExists(configPath)) {
                const configContent = await utils_1.FileSystem.readFile(configPath);
                const config = JSON.parse(configContent);
                const errors = utils_1.Validation.validateConfig(config);
                if (errors.length > 0) {
                    utils_1.Logger.error(`Invalid configuration:\n${errors.join('\n')}`);
                    throw new Error('Invalid configuration');
                }
                return { ...this.DEFAULT_CONFIG, ...config };
            }
        }
        catch (error) {
            utils_1.Logger.warn(`Failed to load config from ${configPath}`);
            utils_1.Logger.debug(error instanceof Error ? error.message : 'Unknown error');
        }
        return this.DEFAULT_CONFIG;
    }
    static async saveConfig(config, projectConfig) {
        const configPath = path_1.default.join(projectConfig.root, projectConfig.configFile);
        const errors = utils_1.Validation.validateConfig(config);
        if (errors.length > 0) {
            utils_1.Logger.error(`Invalid configuration:\n${errors.join('\n')}`);
            throw new Error('Invalid configuration');
        }
        try {
            await utils_1.FileSystem.createFile(configPath, JSON.stringify(config, null, 2));
            utils_1.Logger.success(`Configuration saved to ${configPath}`);
        }
        catch (error) {
            utils_1.Logger.error(`Failed to save config to ${configPath}`);
            throw error;
        }
    }
}
exports.ConfigManager = ConfigManager;
ConfigManager.DEFAULT_CONFIG = {
    projectName: '',
    typescript: true,
    stack: {
        styling: 'scss',
        stateManager: 'redux',
        testing: 'jest',
    },
    templates: {},
    layers: {
        app: { segments: ['config'] },
        pages: { segments: ['ui', 'model'] },
        widgets: { segments: ['ui', 'model'] },
        features: { segments: ['ui', 'model', 'api'] },
        entities: { segments: ['ui', 'model', 'api'] },
        shared: { segments: ['ui', 'lib', 'config'] },
    },
};
