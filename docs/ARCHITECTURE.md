# Architecture Overview

## Feature-Sliced Design

This project follows the Feature-Sliced Design (FSD) methodology, which is an architectural methodology for frontend projects. The main principles are:

1. **Isolation**: Each slice is isolated and independent
2. **Layers**: Code is organized in layers from high-level to low-level abstractions
3. **Segments**: Each layer can contain different segments (ui, model, api, etc.)

### Layers

1. **app/** - Application initialization layer
   - Global providers
   - Global styles
   - Navigation setup

2. **processes/** - Complex processes layer
   - Business processes
   - Complex workflows
   - Scenarios

3. **pages/** - Pages/Screens layer
   - Page components
   - Page routing
   - Page layouts

4. **widgets/** - Complex components layer
   - Complex UI components
   - Composite components
   - Widget containers

5. **features/** - User interactions layer
   - User actions
   - Forms
   - Business features

6. **entities/** - Business entities layer
   - Domain models
   - Entity components
   - Entity logic

7. **shared/** - Reusable infrastructure
   - UI components
   - Utilities
   - Types
   - API clients

### Segments

Each layer can contain several segments:

- **ui/** - UI components
- **model/** - Business logic and state
- **api/** - API integration
- **lib/** - Utilities and helpers
- **config/** - Configuration

## Project Structure

The generator creates the following structure:

```
src/
├── app/
│   └── config/
├── processes/
│   ├── ui/
│   └── model/
├── pages/
│   ├── ui/
│   └── model/
├── widgets/
│   ├── ui/
│   └── model/
├── features/
│   ├── ui/
│   ├── model/
│   └── api/
├── entities/
│   ├── ui/
│   ├── model/
│   └── api/
└── shared/
    ├── ui/
    ├── lib/
    └── config/
```

## Generator Architecture

The generator itself is built with a modular architecture:

### Core Components

1. **Generator** (`src/core/generator.ts`)
   - Main logic for structure generation
   - Template processing
   - File system operations

2. **Config Manager** (`src/core/config-manager.ts`)
   - Configuration loading and validation
   - Default config management
   - Config file operations

3. **Template Engine** (`src/core/template-engine.ts`)
   - Template loading and processing
   - Variable substitution
   - Custom template support

### CLI Interface

1. **Commands** (`src/cli/commands.ts`)
   - Command definitions
   - Command handlers
   - Options parsing

2. **Prompts** (`src/cli/prompts.ts`)
   - Interactive prompts
   - User input handling
   - Validation

### Utilities

1. **Logger** (`src/utils/logger.ts`)
   - Colored console output
   - Log levels
   - Debug information

2. **File System** (`src/utils/fs.ts`)
   - File operations
   - Directory creation
   - Path resolution

3. **Validation** (`src/utils/validation.ts`)
   - Config validation
   - Input validation
   - Type checking

4. **Templates** (`src/utils/templates.ts`)
   - Default templates
   - Template processing
   - Variable substitution
