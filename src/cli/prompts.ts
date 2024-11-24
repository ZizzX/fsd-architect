import inquirer from 'inquirer';
import { FSDConfig, GeneratorOptions } from '../types';

export async function promptForProjectInit(): Promise<FSDConfig> {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Enter project name:',
      validate: (input: string): string | boolean => {
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

export async function promptForLayerCreation(config: FSDConfig): Promise<GeneratorOptions> {
  const answers = await inquirer.prompt([
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
      validate: (input: string): string | boolean => {
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
