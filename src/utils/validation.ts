import { FSDConfig, LayerType, SegmentType } from '../types';

export class Validation {
  static isValidLayerType(layer: unknown): layer is LayerType {
    const validLayers: LayerType[] = ['app', 'processes', 'pages', 'widgets', 'features', 'entities', 'shared'];
    return typeof layer === 'string' && validLayers.includes(layer as LayerType);
  }

  static isValidSegmentType(segment: string): segment is SegmentType {
    const validSegments: SegmentType[] = ['ui', 'model', 'api', 'lib', 'config'];
    return validSegments.includes(segment as SegmentType);
  }

  static validateConfig(config: Partial<FSDConfig>): string[] {
    const errors: string[] = [];

    if (!config.projectName) {
      errors.push('Project name is required');
    }

    if (config.layers) {
      Object.entries(config.layers).forEach(([layer, layerConfig]) => {
        if (!this.isValidLayerType(layer)) {
          errors.push(`Invalid layer type: ${layer}`);
        }

        layerConfig.segments?.forEach((segment) => {
          if (!this.isValidSegmentType(segment)) {
            errors.push(`Invalid segment type: ${segment} in layer ${layer}`);
          }
        });
      });
    }

    return errors;
  }

  static validatePath(path: string): boolean {
    // Простая валидация пути
    return /^[a-zA-Z0-9\-_/\\]+$/.test(path);
  }
}
