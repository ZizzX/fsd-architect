import path from 'path';
import { TemplateData } from '../types';
import { FileSystem, Logger, Templates } from '../utils';

export class TemplateEngine {
  private templatesDir: string;

  constructor(templatesDir: string) {
    this.templatesDir = templatesDir;
  }

  async loadTemplate(templateName: string): Promise<string> {
    const templatePath = path.join(this.templatesDir, `${templateName}.template`);

    try {
      if (await FileSystem.fileExists(templatePath)) {
        return await FileSystem.readFile(templatePath);
      }

      Logger.warn(`Template not found: ${templateName}`);
      return Templates.getDefaultTemplate(templateName);
    } catch (error) {
      Logger.error(`Failed to load template: ${templateName}`);
      throw error;
    }
  }

  async renderTemplate(templateName: string, data: TemplateData): Promise<string> {
    const template = await this.loadTemplate(templateName);
    return Templates.processTemplate(template, data);
  }

  async saveTemplate(templateName: string, content: string): Promise<void> {
    const templatePath = path.join(this.templatesDir, `${templateName}.template`);

    try {
      await FileSystem.createFile(templatePath, content);
      Logger.success(`Template saved: ${templateName}`);
    } catch (error) {
      Logger.error(`Failed to save template: ${templateName}`);
      throw error;
    }
  }
}
