import { Templates } from '../../src/utils/templates';

describe('Templates Utility', () => {
  it('should get default template for a given type', () => {
    const indexTemplate = Templates.getDefaultTemplate('index');
    expect(indexTemplate).toBeDefined();
    expect(typeof indexTemplate).toBe('string');
  });

  it('should process template with provided data', () => {
    const template = 'Hello, {{name}}!';
    const data = { name: 'World' };
    const processedTemplate = Templates.processTemplate(template, data);
    expect(processedTemplate).toBe('Hello, World!');
  });

  it('should handle template with no variables', () => {
    const template = 'Hello, World!';
    const data = { name: 'Test' };
    const processedTemplate = Templates.processTemplate(template, data);
    expect(processedTemplate).toBe('Hello, World!');
  });

  it('should return empty string for empty template', () => {
    const template = '';
    const data = { name: 'Test' };
    const processedTemplate = Templates.processTemplate(template, data);
    expect(processedTemplate).toBe('');
  });
});
