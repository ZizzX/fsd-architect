import { TemplateData } from '../types';

export class Templates {
  static processTemplate(template: string, data: TemplateData): string {
    return template.replace(/\{\{([^}]+)\}\}/g, (_, key) => String(data[key.trim()] || ''));
  }

  static getDefaultTemplate(type: string): string {
    const templates: Record<string, string> = {
      component: `import { FC } from 'react';

export interface {{name}}Props {
  // define props
}

export const {{name}}: FC<{{name}}Props> = () => {
  return (
    <div>
      {{name}} Component
    </div>
  );
};`,
      model: `// {{name}} Model
export interface {{name}}State {
  // define state
}

export const initial{{name}}State: {{name}}State = {
  // initial state
};`,
      index: `// Public API
export * from '.';`,
    };

    return templates[type] || '';
  }
}
