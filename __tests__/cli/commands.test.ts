import { Command } from 'commander';
import { setupCommands } from '../../src/cli/commands';
import { ConfigManager } from '../../src/core/config-manager';
import { FSDGenerator } from '../../src/core/generator';
import { Logger } from '../../src/utils';

// Mock dependencies
jest.mock('../../src/core/generator');
jest.mock('../../src/utils/logger');
jest.mock('../../src/core/config-manager');
jest.mock('../../src/cli/prompts', () => ({
  promptForProjectInit: jest.fn().mockResolvedValue({
    projectName: 'test-project',
    typescript: true,
    layers: {},
    templates: {},
  }),
  promptForLayerCreation: jest.fn().mockResolvedValue({
    layer: 'features',
    name: 'test-feature',
    path: 'src',
    segments: ['ui'],
  }),
}));

describe('CLI Commands', () => {
  let program: Command;

  beforeEach(() => {
    program = new Command();
    setupCommands(program);

    // Mock process.exit to prevent actual exit during tests
    jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize project with flat structure', async () => {
    (ConfigManager.saveConfig as jest.Mock).mockResolvedValue(undefined);
    const mockGenerateLayer = FSDGenerator.prototype.generateLayer as jest.Mock;
    mockGenerateLayer.mockResolvedValue(undefined);

    await program.parseAsync(['node', 'test', 'init']);

    expect(ConfigManager.saveConfig).toHaveBeenCalled();

    // Проверяем создание слоя app без вложенной папки
    expect(mockGenerateLayer).toHaveBeenCalledWith(
      expect.objectContaining({
        layer: 'app',
        name: '',
        path: 'src',
        segments: ['config'],
      })
    );

    // Проверяем создание других слоев без вложенных папок
    ['processes', 'pages', 'widgets', 'features', 'entities', 'shared'].forEach((layer) => {
      expect(mockGenerateLayer).toHaveBeenCalledWith(
        expect.objectContaining({
          layer,
          name: '',
          path: 'src',
          segments: [],
        })
      );
    });

    expect(Logger.success).toHaveBeenCalledWith('Project initialized successfully!');
  });

  it('should create layer', async () => {
    (ConfigManager.loadConfig as jest.Mock).mockResolvedValue({
      projectName: 'test-project',
      typescript: true,
      layers: {},
      templates: {},
    });

    const mockGenerateLayer = FSDGenerator.prototype.generateLayer as jest.Mock;
    mockGenerateLayer.mockResolvedValue(undefined);

    await program.parseAsync(['node', 'test', 'create', 'layer']);

    expect(ConfigManager.loadConfig).toHaveBeenCalled();
    expect(mockGenerateLayer).toHaveBeenCalledWith(
      expect.objectContaining({
        layer: 'features',
        name: 'test-feature',
        path: 'src',
        segments: ['ui'],
      })
    );
    expect(Logger.success).toHaveBeenCalledWith('Structure created successfully!');
  });

  it('should handle invalid create type', async () => {
    await program.parseAsync(['node', 'test', 'create', 'invalid-type']);

    expect(Logger.error).toHaveBeenCalledWith(expect.stringContaining('Invalid type'));
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
