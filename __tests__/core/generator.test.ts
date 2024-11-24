import { FSDGenerator } from '../../src/core/generator';
import { FSDConfig, GeneratorOptions, LayerType } from '../../src/types';
import { FileSystem } from '../../src/utils';

// Mock FileSystem
jest.mock('../../src/utils/fs');

describe('FSDGenerator', () => {
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
      shared: { segments: ['ui', 'lib'] },
    },
  };

  const generator = new FSDGenerator(mockConfig);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create layer with specified segments', async () => {
    const options: GeneratorOptions = {
      path: 'src',
      layer: 'features',
      name: 'test-feature',
      segments: ['ui', 'model'],
    };

    await generator.generateLayer(options);

    const normalizePath = (p: string): string => p.replace(/\\/g, '/');

    const calls = (FileSystem.createDirectory as jest.Mock).mock.calls.map(([callPath]): string =>
      normalizePath(callPath)
    );

    expect(calls).toEqual(
      expect.arrayContaining([
        expect.stringContaining('src/features/test-feature'),
        expect.stringContaining('src/features/test-feature/ui'),
        expect.stringContaining('src/features/test-feature/model'),
      ])
    );
  });

  it('should throw error for invalid layer type', async () => {
    const options: GeneratorOptions = {
      path: 'src',
      layer: 'invalid' as LayerType,
      name: 'test-feature',
      segments: ['ui', 'model'],
    };

    await expect(generator.generateLayer(options)).rejects.toThrow('Invalid layer type');
  });

  it('should create layer with default segments if not specified', async () => {
    const options: GeneratorOptions = {
      path: 'src',
      layer: 'features',
      name: 'test-feature',
    };

    await generator.generateLayer(options);

    const normalizePath = (p: string): string => p.replace(/\\/g, '/');

    const calls = (FileSystem.createDirectory as jest.Mock).mock.calls.map(([callPath]): string =>
      normalizePath(callPath)
    );

    expect(calls).toEqual(
      expect.arrayContaining([
        expect.stringContaining('src/features/test-feature'),
        expect.stringContaining('src/features/test-feature/ui'),
        expect.stringContaining('src/features/test-feature/model'),
        expect.stringContaining('src/features/test-feature/api'),
      ])
    );
  });
});
