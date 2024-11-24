export interface CLIConfig {
  configPath?: string;
  verbose: boolean;
  force: boolean;
}

export interface ProjectConfig {
  root: string;
  srcDir: string;
  configFile: string;
}

export interface LoggerConfig {
  level: 'info' | 'warn' | 'error' | 'debug' | 'success';
  silent: boolean;
}
