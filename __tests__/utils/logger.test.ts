import { Logger } from '../../src/utils/logger';

describe('Logger', () => {
  // Mock console methods
  const mockConsole = {
    log: jest.spyOn(console, 'log').mockImplementation(),
    error: jest.spyOn(console, 'error').mockImplementation(),
  };

  beforeEach(() => {
    // Reset configuration before each test
    Logger.configure({ level: 'info', silent: false });
    jest.clearAllMocks();
  });

  it('should log info message', () => {
    Logger.info('test message');
    expect(mockConsole.log).toHaveBeenCalled();
  });

  it('should log error message', () => {
    Logger.error('error message');
    expect(mockConsole.error).toHaveBeenCalled();
  });

  it('should not log when silent mode is enabled', () => {
    Logger.configure({ level: 'info', silent: true });
    Logger.info('test message');
    Logger.error('error message');
    expect(mockConsole.log).not.toHaveBeenCalled();
    expect(mockConsole.error).not.toHaveBeenCalled();
  });

  it('should only log errors when level is error', () => {
    Logger.configure({ level: 'error', silent: false });
    Logger.info('test message');
    Logger.error('error message');
    expect(mockConsole.log).not.toHaveBeenCalled();
    expect(mockConsole.error).toHaveBeenCalled();
  });
});
