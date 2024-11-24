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
            message: 'Enter project name:',
            validate: (input) => {
                if (!input.trim()) {
                    return 'Project name is required';
                }
                return true;
            },
        },
        {
            type: 'confirm',
            name: 'typescript',
            message: 'Use TypeScript?',
            default: true,
        },
        {
            type: 'list',
            name: 'styling',
            message: 'Choose styling approach:',
            choices: ['scss', 'css', 'less', 'styled-components'],
        },
        {
            type: 'list',
            name: 'stateManager',
            message: 'Choose state management:',
            choices: ['redux', 'mobx', 'zustand', 'none'],
        },
    ]);
    return {
        projectName: answers.projectName,
        typescript: answers.typescript,
        stack: {
            styling: answers.styling,
            stateManager: answers.stateManager,
            testing: 'jest', // По умолчанию используем Jest
        },
        templates: {},
        layers: {},
    };
}
async function promptForLayerCreation(config) {
    const answers = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'layer',
            message: 'Choose layer type:',
            choices: ['features', 'entities', 'shared', 'widgets'],
        },
        {
            type: 'input',
            name: 'name',
            message: 'Enter layer name:',
            validate: (input) => {
                if (!input.trim()) {
                    return 'Layer name is required';
                }
                return true;
            },
        },
        {
            type: 'input',
            name: 'path',
            message: 'Enter layer path:',
            default: 'src',
        },
        {
            type: 'checkbox',
            name: 'segments',
            message: 'Select layer segments:',
            choices: ['ui', 'model', 'api', 'lib'],
        },
    ]);
    return {
        layer: answers.layer,
        name: answers.name,
        path: answers.path,
        segments: answers.segments,
        config,
    };
}
