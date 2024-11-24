"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FSDGenerator = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
class FSDGenerator {
    constructor(config) {
        this.config = config;
    }
    async generateLayer(options) {
        const { path: basePath, layer, name, segments = [] } = options;
        if (!layer || !utils_1.Validation.isValidLayerType(layer)) {
            throw new Error(`Invalid layer type: ${layer}`);
        }
        const layerPath = path_1.default.join(basePath, layer, name);
        await utils_1.FileSystem.createDirectory(layerPath);
        utils_1.Logger.info(`Creating ${layer} layer: ${name}`);
        for (const segment of segments) {
            if (!utils_1.Validation.isValidSegmentType(segment)) {
                utils_1.Logger.warn(`Skipping invalid segment type: ${segment}`);
                continue;
            }
            await this.generateSegment(layerPath, segment, name);
        }
        // Create index file
        await this.createIndexFile(layerPath, name);
        utils_1.Logger.success(`Successfully created ${layer} layer: ${name}`);
    }
    async generateSegment(basePath, segment, name) {
        const segmentPath = path_1.default.join(basePath, segment);
        await utils_1.FileSystem.createDirectory(segmentPath);
        const templates = this.getTemplatesForSegment(segment);
        for (const [fileName, template] of Object.entries(templates)) {
            const filePath = path_1.default.join(segmentPath, `${fileName}.ts`);
            const content = utils_1.Templates.processTemplate(template, { name });
            await utils_1.FileSystem.createFile(filePath, content);
        }
    }
    getTemplatesForSegment(segment) {
        const defaultTemplates = {
            ui: {
                index: utils_1.Templates.getDefaultTemplate('index'),
                component: utils_1.Templates.getDefaultTemplate('component'),
            },
            model: {
                index: utils_1.Templates.getDefaultTemplate('index'),
                model: utils_1.Templates.getDefaultTemplate('model'),
            },
            api: {
                index: utils_1.Templates.getDefaultTemplate('index'),
                api: `export const {{name}}Api = {
  // API methods
};`,
            },
            lib: {
                index: utils_1.Templates.getDefaultTemplate('index'),
            },
            config: {
                index: utils_1.Templates.getDefaultTemplate('index'),
                config: `export const {{name}}Config = {
  // Configuration
};`,
            },
        };
        return defaultTemplates[segment] || {};
    }
    async createIndexFile(basePath, name) {
        const indexPath = path_1.default.join(basePath, 'index.ts');
        const content = utils_1.Templates.processTemplate(utils_1.Templates.getDefaultTemplate('index'), { name });
        await utils_1.FileSystem.createFile(indexPath, content);
    }
}
exports.FSDGenerator = FSDGenerator;
