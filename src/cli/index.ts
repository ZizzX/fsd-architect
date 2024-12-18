#!/usr/bin/env node
import { Command } from 'commander';
import { setupCommands } from './commands';

const program = new Command();
setupCommands(program);
program.parse(process.argv);
