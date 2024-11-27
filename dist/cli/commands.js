"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCommands = setupCommands;
const constants_1 = require("../constants");
const core_1 = require("../core");
const utils_1 = require("../utils");
const prompts_1 = require("./prompts");
function setupCommands(program) {
    program
        .name('fsd')
        .description('CLI tool for generating Feature-Sliced Design (FSD) project structure with best practices')
        .version(constants_1.VERSION);
    program
        .command('init')
        .description('Initialize a new Feature-Sliced Design project with recommended structure and configuration')
        .option('-c, --config <path>', 'Path to config file (default: fsd.config.json)', 'fsd.config.json')
        .option('-f, --force', 'Force initialization even if config exists', false)
        .option('-v, --verbose', 'Enable verbose logging for debugging', false)
        .option('-t, --typescript', 'Initialize project with TypeScript support', true)
        .option('-s, --styling <type>', 'Choose styling approach (scss/css/less/styled-components)', 'scss')
        .option('-sm, --state-manager <type>', 'Choose state management (redux/mobx/zustand/none)', 'redux')
        .action(async (options) => {
        try {
            utils_1.Logger.configure({ level: options.verbose ? 'debug' : 'info' });
            const projectConfig = {
                root: process.cwd(),
                srcDir: 'src',
                configFile: options.configPath || 'fsd.config.json',
            };
            const config = await (0, prompts_1.promptForProjectInit)();
            await core_1.ConfigManager.saveConfig(config, projectConfig);
            const generator = new core_1.FSDGenerator(config);
            await generator.generateLayer({
                path: projectConfig.srcDir,
                layer: 'app',
                name: 'app',
                segments: ['config'],
            });
            utils_1.Logger.success('Project initialized successfully!');
        }
        catch (error) {
            if (error instanceof Error) {
                utils_1.Logger.error(error.message);
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
        .action(async (type, options) => {
        try {
            utils_1.Logger.configure({ level: options.verbose ? 'debug' : 'info' });
            const projectConfig = {
                root: process.cwd(),
                srcDir: 'src',
                configFile: options.configPath || 'fsd.config.json',
            };
            const config = await core_1.ConfigManager.loadConfig(projectConfig);
            const generator = new core_1.FSDGenerator(config);
            if (type === 'layer') {
                const layerOptions = await (0, prompts_1.promptForLayerCreation)(config);
                await generator.generateLayer(layerOptions);
            }
            else {
                utils_1.Logger.error(`Invalid type: ${type}`);
                process.exit(1);
            }
            utils_1.Logger.success('Structure created successfully!');
        }
        catch (error) {
            if (error instanceof Error) {
                utils_1.Logger.error(error.message);
            }
        }
    });
}
