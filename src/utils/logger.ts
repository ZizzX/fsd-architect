import chalk, { Chalk } from 'chalk';
import { LoggerConfig } from '../types';

export class Logger {
  private static config: LoggerConfig = {
    level: 'info',
    silent: false,
  };

  private static log(type: LoggerConfig['level'], message: string): void {
    if (this.config.silent) return;

    const colorMap: Record<LoggerConfig['level'], Chalk> = {
      info: chalk.blue,
      success: chalk.green,
      warn: chalk.yellow,
      error: chalk.red,
      debug: chalk.gray,
    };

    const prefix: Record<LoggerConfig['level'], string> = {
      info: 'ℹ',
      success: '✔',
      warn: '⚠',
      error: '✖',
      debug: '🔍',
    };

    const colorFunc = colorMap[type];
    const prefixSymbol = prefix[type];

    if (Logger.config.level === 'error' && type !== 'error') return;
    if (type === 'error') {
      console.error(`${colorFunc(prefixSymbol)} ${colorFunc(message)}`);
      return;
    }
    console.log(`${colorFunc(prefixSymbol)} ${colorFunc(message)}`);
  }

  static configure(config: Partial<LoggerConfig>): void {
    Logger.config = { ...Logger.config, ...config };
  }

  static info(message: string): void {
    if (Logger.config.silent || Logger.config.level === 'error') {
      this.error(message);
      return;
    }
    this.log('info', message);
  }

  static success(message: string): void {
    if (Logger.config.silent || Logger.config.level === 'error') {
      this.error(message);
      return;
    }
    this.log('success', message);
  }

  static warn(message: string): void {
    if (Logger.config.silent || Logger.config.level === 'error') {
      this.error(message);
      return;
    }
    this.log('warn', message);
  }

  static error(message: string | Error): void {
    const errorMessage = message instanceof Error ? message.message : message;
    this.log('error', errorMessage);
  }

  static debug(message: string): void {
    if (Logger.config.silent || Logger.config.level === 'error') {
      this.error(message);
      return;
    }
    this.log('debug', message);
  }
}
