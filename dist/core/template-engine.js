"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateEngine = void 0;
const path_1 = __importDefault(require("path"));
const utils_1 = require("../utils");
class TemplateEngine {
    constructor(templatesDir) {
        this.templatesDir = templatesDir;
    }
    async loadTemplate(templateName) {
        const templatePath = path_1.default.join(this.templatesDir, `${templateName}.template`);
        try {
            if (await utils_1.FileSystem.fileExists(templatePath)) {
                return await utils_1.FileSystem.readFile(templatePath);
            }
            utils_1.Logger.warn(`Template not found: ${templateName}`);
            return utils_1.Templates.getDefaultTemplate(templateName);
        }
        catch (error) {
            utils_1.Logger.error(`Failed to load template: ${templateName}`);
            throw error;
        }
    }
    async renderTemplate(templateName, data) {
        const template = await this.loadTemplate(templateName);
        return utils_1.Templates.processTemplate(template, data);
    }
    async saveTemplate(templateName, content) {
        const templatePath = path_1.default.join(this.templatesDir, `${templateName}.template`);
        try {
            await utils_1.FileSystem.createFile(templatePath, content);
            utils_1.Logger.success(`Template saved: ${templateName}`);
        }
        catch (error) {
            utils_1.Logger.error(`Failed to save template: ${templateName}`);
            throw error;
        }
    }
}
exports.TemplateEngine = TemplateEngine;
