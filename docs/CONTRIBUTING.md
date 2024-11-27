# Contributing Guide

## Getting Started

1. Fork the repository
2. Clone your fork
3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a feature branch:

   ```bash
   git checkout -b feature/amazing-feature
   ```

## Development Process

1. Make your changes
2. Add tests for new functionality
3. Ensure all tests pass:

   ```bash
   npm test
   ```

4. Lint your code:

   ```bash
   npm run lint
   ```

5. Build the project:

   ```bash
   npm run build
   ```

6. Test CLI commands locally:

   ```bash
   # Link package locally
   npm link

   # Test using either short or full command
   fsd --help
   fsd-architect --help
   ```

## Commit Guidelines

We use conventional commits. Format:

```
type(scope): description

[optional body]

[optional footer]
```

Types:

- feat: New feature
- fix: Bug fix
- docs: Documentation changes
- style: Code style changes
- refactor: Code refactoring
- test: Adding tests
- chore: Maintenance

Example:

```
feat(generator): add support for custom templates

Added ability to use custom templates for code generation.
Templates can be specified in the configuration file.

Closes #123
```

## Pull Request Process

1. Update documentation if needed
2. Add tests for new functionality
3. Ensure CI passes
4. Request review from maintainers
5. Address review comments

## Code Style

- Use TypeScript
- Follow ESLint rules
- Write meaningful commit messages
- Add JSDoc comments for public APIs
- Keep code modular and testable

## Testing

- Write unit tests for new functionality
- Maintain test coverage above 80%
- Test edge cases
- Mock external dependencies

## Documentation

- Update README.md if needed
- Add JSDoc comments
- Update architecture docs for significant changes
- Include examples for new features
