"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validation = void 0;
class Validation {
    static isValidLayerType(layer) {
        const validLayers = ['app', 'processes', 'pages', 'widgets', 'features', 'entities', 'shared'];
        return validLayers.includes(layer);
    }
    static isValidSegmentType(segment) {
        const validSegments = ['ui', 'model', 'api', 'lib', 'config'];
        return validSegments.includes(segment);
    }
    static validateConfig(config) {
        const errors = [];
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
    static validatePath(path) {
        // Простая валидация пути
        return /^[a-zA-Z0-9\-_/\\]+$/.test(path);
    }
}
exports.Validation = Validation;
