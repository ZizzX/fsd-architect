import { Command } from 'commander';
import { VERSION } from '../constants';
import { ConfigManager, FSDGenerator } from '../core';
import { CLIConfig, LayerType, ProjectConfig } from '../types';
import { Logger } from '../utils';
import { promptForLayerCreation, promptForProjectInit } from './prompts';

export function setupCommands(program: Command): void {
  program
    .name('fsd')
    .description('CLI tool for generating Feature-Sliced Design (FSD) project structure with best practices')
    .version(VERSION);

  program
    .command('init')
    .description('Initialize a new Feature-Sliced Design project with recommended structure and configuration')
    .option('-c, --config <path>', 'Path to config file (default: fsd.config.json)', 'fsd.config.json')
    .option('-f, --force', 'Force initialization even if config exists', false)
    .option('-v, --verbose', 'Enable verbose logging for debugging', false)
    .option('-t, --typescript', 'Initialize project with TypeScript support', true)
    .option('-s, --styling <type>', 'Choose styling approach (scss/css/less/styled-components)', 'scss')
    .option('-sm, --state-manager <type>', 'Choose state management (redux/mobx/zustand/none)', 'redux')
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

        // Create src directory
        await generator.createDirectory(projectConfig.srcDir);
        Logger.info('Creating project structure...');

        // Create base FSD layers
        const baseLayers: LayerType[] = ['app', 'processes', 'pages', 'widgets', 'features', 'entities', 'shared'];

        for (const layer of baseLayers) {
          await generator.generateLayer({
            path: projectConfig.srcDir,
            layer,
            name: '',
            segments: layer === 'app' ? ['config'] : [],
          });
        }

        Logger.success('Project initialized successfully!');
        Logger.info('Created FSD structure:');
        Logger.info('src/');
        baseLayers.forEach((layer) => Logger.info(`  ├── ${layer}/`));
      } catch (error) {
        if (error instanceof Error) {
          Logger.error(error.message);
        }
      }
    });

  program
    .command('create')
    .description('Create a new FSD layer, segment, or feature')
    .argument('<type>', 'Type of structure to create (layer/segment/feature)')
    .option('-c, --config <path>', 'Path to config file (default: fsd.config.json)', 'fsd.config.json')
    .option('-v, --verbose', 'Enable verbose logging for debugging', false)
    .option('-n, --name <name>', 'Name of the created element')
    .option('-l, --layer <type>', 'Layer type (features/entities/shared/widgets/pages/processes/app)')
    .option('-s, --segments <items>', 'Segments to include (ui,model,api,lib,config)', 'ui')
    .option('-p, --path <path>', 'Custom path for creation (default: src)', 'src')
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
