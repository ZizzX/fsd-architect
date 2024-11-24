import { TemplateEngine } from '../../src/core/template-engine';
import { FileSystem, Templates } from '../../src/utils';
import path from 'path';

jest.mock('../../src/utils/fs');
jest.mock('../../src/utils/templates');

describe('TemplateEngine', () => {
  const mockTemplateDir = '/mock/templates';
  const templateEngine = new TemplateEngine(mockTemplateDir);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should load template from file', async () => {
    const mockTemplateName = 'component';
    const mockTemplatePath = path.join(mockTemplateDir, `${mockTemplateName}.template`);
    const mockTemplateContent = 'Template content: {{name}}';

    (FileSystem.fileExists as jest.Mock).mockResolvedValue(true);
    (FileSystem.readFile as jest.Mock).mockResolvedValue(mockTemplateContent);

    const template = await templateEngine.loadTemplate(mockTemplateName);

    expect(FileSystem.fileExists).toHaveBeenCalledWith(mockTemplatePath);
    expect(FileSystem.readFile).toHaveBeenCalledWith(mockTemplatePath);
    expect(template).toBe(mockTemplateContent);
  });

  it('should use default template if file not found', async () => {
    const mockTemplateName = 'component';
    const mockDefaultTemplate = 'Default template content';

    (FileSystem.fileExists as jest.Mock).mockResolvedValue(false);
    (Templates.getDefaultTemplate as jest.Mock).mockReturnValue(mockDefaultTemplate);

    const template = await templateEngine.loadTemplate(mockTemplateName);

    expect(Templates.getDefaultTemplate).toHaveBeenCalledWith(mockTemplateName);
    expect(template).toBe(mockDefaultTemplate);
  });

  it('should render template with provided data', async () => {
    const mockTemplateName = 'component';
    const mockTemplateContent = 'Template content: {{name}}';
    const mockTemplateData = { name: 'TestComponent' };
    const mockRenderedTemplate = 'Template content: TestComponent';

    (FileSystem.fileExists as jest.Mock).mockResolvedValue(true);
    (FileSystem.readFile as jest.Mock).mockResolvedValue(mockTemplateContent);
    (Templates.processTemplate as jest.Mock).mockReturnValue(mockRenderedTemplate);

    const renderedTemplate = await templateEngine.renderTemplate(mockTemplateName, mockTemplateData);

    expect(Templates.processTemplate).toHaveBeenCalledWith(mockTemplateContent, mockTemplateData);
    expect(renderedTemplate).toBe(mockRenderedTemplate);
  });

  it('should save template to file', async () => {
    const mockTemplateName = 'component';
    const mockTemplateContent = 'Template content';
    const mockTemplatePath = path.join(mockTemplateDir, `${mockTemplateName}.template`);

    await templateEngine.saveTemplate(mockTemplateName, mockTemplateContent);

    expect(FileSystem.createFile).toHaveBeenCalledWith(mockTemplatePath, mockTemplateContent);
  });
});
