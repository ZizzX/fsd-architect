import path from 'path';
import { FSDConfig, ProjectConfig } from '../types';
import { FileSystem, Logger, Validation } from '../utils';

export class ConfigManager {
  private static readonly DEFAULT_CONFIG: FSDConfig = {
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

  static async loadConfig(projectConfig: ProjectConfig): Promise<FSDConfig> {
    const configPath = path.join(projectConfig.root, projectConfig.configFile);

    try {
      if (await FileSystem.fileExists(configPath)) {
        const configContent = await FileSystem.readFile(configPath);
        const config = JSON.parse(configContent);
        const errors = Validation.validateConfig(config);

        if (errors.length > 0) {
          Logger.error(`Invalid configuration:\n${errors.join('\n')}`);
          throw new Error('Invalid configuration');
        }

        return { ...this.DEFAULT_CONFIG, ...config };
      }
    } catch (error) {
      Logger.warn(`Failed to load config from ${configPath}`);
      Logger.debug(error instanceof Error ? error.message : 'Unknown error');
    }

    return this.DEFAULT_CONFIG;
  }

  static async saveConfig(config: FSDConfig, projectConfig: ProjectConfig): Promise<void> {
    const configPath = path.join(projectConfig.root, projectConfig.configFile);
    const errors = Validation.validateConfig(config);

    if (errors.length > 0) {
      Logger.error(`Invalid configuration:\n${errors.join('\n')}`);
      throw new Error('Invalid configuration');
    }

    try {
      await FileSystem.createFile(configPath, JSON.stringify(config, null, 2));
      Logger.success(`Configuration saved to ${configPath}`);
    } catch (error) {
      Logger.error(`Failed to save config to ${configPath}`);
      throw error;
    }
  }
}
