import path from 'path';
import { ConfigManager } from '../../src/core/config-manager';
import { FSDConfig, ProjectConfig } from '../../src/types';
import { FileSystem, Validation } from '../../src/utils';

jest.mock('fs-extra');
jest.mock('../../src/utils/fs');
jest.mock('../../src/utils/validation');

describe('ConfigManager', () => {
  const testConfigPath = path.join(process.cwd(), 'fsd.config.json');
  const mockProjectConfig: ProjectConfig = {
    root: process.cwd(),
    configFile: 'fsd.config.json',
    srcDir: 'src',
  };

  const mockConfig: FSDConfig = {
    projectName: 'test-project',
    typescript: true,
    stack: {
      styling: 'scss',
      stateManager: 'redux',
      testing: 'jest',
    },
    templates: {},
    layers: {
      features: { segments: ['ui', 'model', 'api'] },
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load config from file when it exists', async () => {
    (FileSystem.fileExists as jest.Mock).mockResolvedValue(true);
    (FileSystem.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockConfig));
    (Validation.validateConfig as jest.Mock).mockReturnValue([]);

    const loadedConfig = await ConfigManager.loadConfig(mockProjectConfig);

    expect(FileSystem.fileExists).toHaveBeenCalledWith(testConfigPath);
    expect(FileSystem.readFile).toHaveBeenCalledWith(testConfigPath);
    expect(Validation.validateConfig).toHaveBeenCalledWith(mockConfig);
    expect(loadedConfig).toEqual(expect.objectContaining(mockConfig));
  });

  it('should return default config when file does not exist', async () => {
    (FileSystem.fileExists as jest.Mock).mockResolvedValue(false);

    const loadedConfig = await ConfigManager.loadConfig(mockProjectConfig);

    expect(loadedConfig).toEqual(
      expect.objectContaining({
        projectName: '',
        typescript: true,
      })
    );
  });

  it('should save config to file', async () => {
    await ConfigManager.saveConfig(mockConfig, mockProjectConfig);

    expect(FileSystem.createFile).toHaveBeenCalledWith(testConfigPath, JSON.stringify(mockConfig, null, 2));
  });

  it('should handle config validation errors', async () => {
    const invalidConfig = {
      ...mockConfig,
    };

    (FileSystem.fileExists as jest.Mock).mockResolvedValue(true);
    (FileSystem.readFile as jest.Mock).mockResolvedValue(JSON.stringify(invalidConfig));

    try {
      await ConfigManager.loadConfig(mockProjectConfig);
    } catch (error: unknown) {
      if (error instanceof Error) {
        expect(error.message).toContain('Invalid configuration');
      } else {
        fail('Expected an Error instance');
      }
    }
  });
});
