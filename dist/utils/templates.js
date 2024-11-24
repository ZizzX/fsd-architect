"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Templates = void 0;
class Templates {
    static processTemplate(template, data) {
        return template.replace(/\{\{([^}]+)\}\}/g, (_, key) => String(data[key.trim()] || ''));
    }
    static getDefaultTemplate(type) {
        const templates = {
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
            index: `export * from './{{name}}';`,
        };
        return templates[type] || '';
    }
}
exports.Templates = Templates;
