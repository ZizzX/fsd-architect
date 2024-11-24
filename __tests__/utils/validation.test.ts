import { FSDConfig } from '../../src/types';
import { Validation } from '../../src/utils/validation';

describe('Validation', () => {
  describe('isValidLayerType', () => {
    it('should return true for valid layer types', () => {
      expect(Validation.isValidLayerType('app')).toBe(true);
      expect(Validation.isValidLayerType('features')).toBe(true);
      expect(Validation.isValidLayerType('shared')).toBe(true);
    });

    it('should return false for invalid layer types', () => {
      expect(Validation.isValidLayerType('invalid')).toBe(false);
      expect(Validation.isValidLayerType('')).toBe(false);
    });
  });

  describe('validateConfig', () => {
    const validConfig: FSDConfig = {
      projectName: 'test-project',
      typescript: true,
      stack: {
        styling: 'scss',
        stateManager: 'redux',
        testing: 'jest',
      },
      templates: {},
      layers: {
        app: { segments: ['config'] },
        features: { segments: ['ui', 'model', 'api'] },
      },
    };

    it('should return empty array for valid config', () => {
      const errors = Validation.validateConfig(validConfig);
      expect(errors).toHaveLength(0);
    });

    it('should return errors for invalid config', () => {
      const invalidConfig = {
        ...validConfig,
        layers: {
          invalid: { segments: ['invalid'] },
        },
      };
      const errors = Validation.validateConfig(invalidConfig as FSDConfig);
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
