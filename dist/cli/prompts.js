"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.promptForProjectInit = promptForProjectInit;
exports.promptForLayerCreation = promptForLayerCreation;
const inquirer_1 = __importDefault(require("inquirer"));
async function promptForProjectInit() {
    const answers = await inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'projectName',
            message: 'Project name:',
            validate: (input) => input.length > 0 || 'Project name is required'
        },
        {
            type: 'confirm',
            name: 'typescript',
            message: 'Use TypeScript?',
            default: true
        },
        {
            type: 'list',
            name: 'styling',
            message: 'Select styling solution:',
            choices: ['css', 'scss', 'less', 'styled-components'],
            default: 'scss'
        },
        {
            type: 'list',
            name: 'stateManager',
            message: 'Select state management solution:',
            choices: ['redux', 'mobx', 'zustand', 'none'],
            default: 'redux'
        }
    ]);
    return {
        projectName: answers.projectName,
        typescript: answers.typescript,
        stack: {
            styling: answers.styling,
            stateManager: answers.stateManager,
            testing: 'jest'
        },
        templates: {},
        layers: {
            app: { segments: ['config'] },
            pages: { segments: ['ui', 'model'] },
            widgets: { segments: ['ui', 'model'] },
            features: { segments: ['ui', 'model', 'api'] },
            entities: { segments: ['ui', 'model', 'api'] },
            shared: { segments: ['ui', 'lib', 'config'] }
        }
    };
}
async function promptForLayerCreation(config) {
    const validLayers = ['pages', 'widgets', 'features', 'entities', 'shared'];
    const answers = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'layer',
            message: 'Select layer:',
            choices: validLayers
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter name:',
            validate: (input) => input.length > 0 || 'Name is required'
        },
        {
            type: 'checkbox',
            name: 'segments',
            message: 'Select segments:',
            choices: (answers) => {
                const layerConfig = config.layers[answers.layer];
                return {
                    ...answers,
                    segments: layerConfig
                };
            }
        }
    ]);
    return {
        path: 'src',
        layer: answers.layer,
        name: answers.name,
        segments: answers.segments
    };
}
