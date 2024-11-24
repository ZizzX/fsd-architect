import { Command } from 'commander';
import { ConfigManager, FSDGenerator } from '../core';
import { CLIConfig, ProjectConfig } from '../types';
import { Logger } from '../utils';
import { promptForLayerCreation, promptForProjectInit } from './prompts';

export function setupCommands(program: Command): void {
  program
    .name('fsd-create')
    .description('CLI tool for generating Feature-Sliced Design project structure')
    .version('0.1.0');

  program
    .command('init')
    .description('Initialize a new FSD project')
    .option('-c, --config <path>', 'Path to config file', 'fsd.config.json')
    .option('-f, --force', 'Force initialization even if config exists', false)
    .option('-v, --verbose', 'Enable verbose logging', false)
    .action(async (options: CLIConfig) => {
      try {
        Logger.configure({ level: options.verbose ? 'debug' : 'info' });

        const projectConfig: ProjectConfig = {
          root: process.cwd(),
          srcDir: 'src',
          configFile: options.configPath || 'fsd.config.json',
        };

        const config = await promptForProjectInit();
        await ConfigManager.saveConfig(config, projectConfig);

        const generator = new FSDGenerator(config);
        await generator.generateLayer({
          path: projectConfig.srcDir,
          layer: 'app',
          name: 'app',
          segments: ['config'],
        });

        Logger.success('Project initialized successfully!');
      } catch (error) {
        if (error instanceof Error) {
          Logger.error(error.message);
        }
      }
    });

  program
    .command('create')
    .description('Create a new FSD layer or segment')
    .argument('<type>', 'Type of structure to create (layer/segment)')
    .option('-c, --config <path>', 'Path to config file', 'fsd.config.json')
    .option('-v, --verbose', 'Enable verbose logging', false)
    .action(async (type: string, options: CLIConfig) => {
      try {
        Logger.configure({ level: options.verbose ? 'debug' : 'info' });

        const projectConfig: ProjectConfig = {
          root: process.cwd(),
          srcDir: 'src',
          configFile: options.configPath || 'fsd.config.json',
        };

        const config = await ConfigManager.loadConfig(projectConfig);
        const generator = new FSDGenerator(config);

        if (type === 'layer') {
          const layerOptions = await promptForLayerCreation(config);
          await generator.generateLayer(layerOptions);
        } else {
          Logger.error(`Invalid type: ${type}`);
          process.exit(1);
        }

        Logger.success('Structure created successfully!');
      } catch (error) {
        if (error instanceof Error) {
          Logger.error(error.message);
        }
      }
    });
}
