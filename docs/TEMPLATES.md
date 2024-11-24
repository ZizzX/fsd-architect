# Templates Guide

## Overview

Templates in FSD Create are used to generate code files with consistent structure and styling. You can use built-in templates or create your own custom templates.

## Built-in Templates

### Component Template

```typescript
import { FC } from 'react';

export interface {{name}}Props {
  // define props
}

export const {{name}}: FC<{{name}}Props> = () => {
  return (
    <div>
      {{name}} Component
    </div>
  );
};
```

### Model Template

```typescript
export interface {{name}}State {
  // define state
}

export const initial{{name}}State: {{name}}State = {
  // initial state
};
```

### API Template

```typescript
export const {{name}}Api = {
  // API methods
};
```

## Custom Templates

### Creating Custom Templates

1. Create a template file (e.g., `templates/custom-component.ts`)
2. Use variables in double curly braces: `{{variableName}}`
3. Add template to your configuration:

```json
{
  "templates": {
    "custom-component": {
      "path": "./templates/custom-component.ts",
      "template": "// Your template content"
    }
  }
}
```

### Available Variables

- `{{name}}` - Component/feature name
- `{{layer}}` - Layer name
- `{{segment}}` - Segment name

### Example Custom Template

```typescript
import { FC } from 'react';
import { useStore } from '{{stateManager}}';

export interface {{name}}Props {
  title: string;
}

export const {{name}}: FC<{{name}}Props> = ({ title }) => {
  const store = useStore();

  return (
    <div className="{{name}}">
      <h1>{title}</h1>
      {/* Component content */}
    </div>
  );
};
```

## Template Usage

Templates are automatically selected based on the segment type and layer. You can override this behavior in your configuration:

```json
{
  "layers": {
    "features": {
      "segments": ["ui", "model", "api"],
      "templates": {
        "ui": "custom-component",
        "model": "custom-model"
      }
    }
  }
}
```
