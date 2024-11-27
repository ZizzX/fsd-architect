# FSD Architect

[![CI](https://github.com/ZizzX/fsd-architect/actions/workflows/ci.yml/badge.svg)](https://github.com/ZizzX/fsd-architect/actions/workflows/ci.yml)
[![npm version](https://badge.fury.io/js/fsd-architect.svg)](https://badge.fury.io/js/fsd-architect)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A professional CLI tool for architecting Feature-Sliced Design (FSD) project structures.

## Features

- 🚀 Quick project scaffolding with FSD architecture
- ⚙️ Flexible configuration
- 🎨 Custom templates support
- 📦 TypeScript support out of the box
- 🛠 Multiple package managers support (npm, yarn, pnpm)
- 📝 Detailed logging
- 🔧 Extensible architecture

## Installation

```bash
# Global installation
npm install -g fsd-architect

# Local installation
npm install --save-dev fsd-architect
```

## Quick Start

You can use either the full command `fsd-architect` or the shorter alias `fsd`:

```bash
# Initialize new FSD project (using short command)
fsd init my-project

# Or using full command
fsd-architect init my-project

# Create new feature (using short command)
fsd create layer --layer features --name auth

# Or using full command
fsd-architect create layer --layer features --name auth
```

## Configuration

Create `fsd.config.json` in your project root:

```json
{
  "projectName": "my-app",
  "typescript": true,
  "stack": {
    "styling": "scss",
    "stateManager": "redux",
    "testing": "jest"
  },
  "layers": {
    "features": {
      "segments": ["ui", "model", "api"]
    }
  }
}
```

## CLI Commands

### `init`

Initialize a new FSD project:

```bash
fsd-architect init [options]

Options:
  -c, --config <path>  Path to config file (default: "fsd.config.json")
  -f, --force          Force initialization even if config exists
  -v, --verbose        Enable verbose logging
```

### `create`

Create new layer or segment:

```bash
fsd-architect create <type> [options]

Arguments:
  type                 Type of structure to create (layer/segment)

Options:
  -c, --config <path>  Path to config file (default: "fsd.config.json")
  -v, --verbose        Enable verbose logging
```

## Project Structure

The generated project follows the Feature-Sliced Design methodology:

```
src/
├── app/          # Application initialization layer
├── processes/    # Complex processes layer
├── pages/        # Pages/Screens layer
├── widgets/      # Complex components layer
├── features/     # User interactions layer
├── entities/     # Business entities layer
└── shared/       # Reusable infrastructure
```

## Custom Templates

You can define custom templates in your configuration:

```json
{
  "templates": {
    "feature": {
      "path": "./templates/feature.ts",
      "template": "// Custom feature template"
    }
  }
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

For more details, see our [Contributing Guide](docs/CONTRIBUTING.md).

## Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [Templates Guide](docs/TEMPLATES.md)
- [Contributing Guide](docs/CONTRIBUTING.md)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Aziz Issapov - [GitHub](https://github.com/ZizzX)
