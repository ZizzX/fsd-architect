"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCommands = setupCommands;
const core_1 = require("../core");
const utils_1 = require("../utils");
const prompts_1 = require("./prompts");
function setupCommands(program) {
    program
        .name('fsd-architect')
        .description('CLI tool for generating Feature-Sliced Design project structure')
        .version('0.1.0');
    program
        .command('init')
        .description('Initialize a new FSD project')
        .option('-c, --config <path>', 'Path to config file', 'fsd.config.json')
        .option('-f, --force', 'Force initialization even if config exists', false)
        .option('-v, --verbose', 'Enable verbose logging', false)
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
        .description('Create a new FSD layer or segment')
        .argument('<type>', 'Type of structure to create (layer/segment)')
        .option('-c, --config <path>', 'Path to config file', 'fsd.config.json')
        .option('-v, --verbose', 'Enable verbose logging', false)
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
