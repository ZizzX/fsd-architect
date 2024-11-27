export type LayerType = 'app' | 'processes' | 'pages' | 'widgets' | 'features' | 'entities' | 'shared';

export type SegmentType = 'ui' | 'model' | 'api' | 'lib' | 'config';

export type LayersConfigType = {
  [key in LayerType]?: {
    segments: SegmentType[];
    templates?: string[];
  };
};

export interface FSDConfig {
  // Основные настройки проекта
  projectName: string;
  typescript: boolean;

  // Технологический стек
  stack: {
    styling: 'css' | 'scss' | 'less' | 'styled-components';
    stateManager: 'redux' | 'mobx' | 'zustand' | 'none';
    testing: 'jest' | 'vitest';
  };

  // Настройки генерации
  templates: {
    [key: string]: {
      path: string;
      template: string;
    };
  };

  // Структура слоев
  layers: LayersConfigType;
}

export interface GeneratorOptions {
  path: string;
  layer: LayerType;
  name: string;
  segments?: SegmentType[];
  config?: Partial<FSDConfig>;
}

export interface TemplateData {
  name: string;
  layer?: LayerType;
  segment?: SegmentType;
  [key: string]: unknown;
}
