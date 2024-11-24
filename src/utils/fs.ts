import fs from 'fs-extra';
import path from 'path';
import { Logger } from './logger';

export class FileSystem {
  static async createDirectory(dirPath: string): Promise<void> {
    try {
      await fs.ensureDir(dirPath);
      Logger.debug(`Created directory: ${dirPath}`);
    } catch (error) {
      Logger.error(`Failed to create directory: ${dirPath}`);
      throw error;
    }
  }

  static async createFile(filePath: string, content: string): Promise<void> {
    try {
      await fs.ensureFile(filePath);
      await fs.writeFile(filePath, content);
      Logger.debug(`Created file: ${filePath}`);
    } catch (error) {
      Logger.error(`Failed to create file: ${filePath}`);
      throw error;
    }
  }

  static async fileExists(filePath: string): Promise<boolean> {
    try {
      return await fs.pathExists(filePath);
    } catch (error) {
      Logger.error(`Failed to check file existence: ${filePath}`);
      throw error;
    }
  }

  static async readFile(filePath: string): Promise<string> {
    try {
      return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
      Logger.error(`Failed to read file: ${filePath}`);
      throw error;
    }
  }

  static resolvePath(...paths: string[]): string {
    return path.resolve(...paths);
  }
}
