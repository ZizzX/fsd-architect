import fs from 'fs-extra';
import path from 'path';
import { FileSystem } from '../../src/utils/fs';
import { Logger } from '../../src/utils/logger';

jest.mock('fs-extra');
jest.mock('../../src/utils/logger');

describe('FileSystem Utility', () => {
  const testDir = '/test/directory';
  const testFile = '/test/file.txt';
  const testContent = 'Test content';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createDirectory', () => {
    it('should create directory recursively', async () => {
      await FileSystem.createDirectory(testDir);

      expect(fs.ensureDir).toHaveBeenCalledWith(testDir);
      expect(Logger.debug).toHaveBeenCalledWith(expect.stringContaining(testDir));
    });

    it('should handle directory creation error', async () => {
      const mockError = new Error('Directory creation failed');
      (fs.ensureDir as jest.Mock).mockRejectedValue(mockError);

      await expect(FileSystem.createDirectory(testDir)).rejects.toThrow(mockError);
      expect(Logger.error).toHaveBeenCalledWith(expect.stringContaining(testDir));
    });
  });

  describe('createFile', () => {
    it('should create file with content', async () => {
      await FileSystem.createFile(testFile, testContent);

      expect(fs.ensureFile).toHaveBeenCalledWith(testFile);
      expect(fs.writeFile).toHaveBeenCalledWith(testFile, testContent);
      expect(Logger.debug).toHaveBeenCalledWith(expect.stringContaining(testFile));
    });

    it('should handle file creation error', async () => {
      const mockError = new Error('File creation failed');
      (fs.ensureFile as jest.Mock).mockRejectedValue(mockError);

      await expect(FileSystem.createFile(testFile, testContent)).rejects.toThrow(mockError);
      expect(Logger.error).toHaveBeenCalledWith(expect.stringContaining(testFile));
    });
  });

  describe('fileExists', () => {
    it('should return true if file exists', async () => {
      (fs.pathExists as jest.Mock).mockResolvedValue(true);

      const exists = await FileSystem.fileExists(testFile);

      expect(fs.pathExists).toHaveBeenCalledWith(testFile);
      expect(exists).toBe(true);
    });

    it('should return false if file does not exist', async () => {
      (fs.pathExists as jest.Mock).mockResolvedValue(false);

      const exists = await FileSystem.fileExists(testFile);

      expect(fs.pathExists).toHaveBeenCalledWith(testFile);
      expect(exists).toBe(false);
    });

    it('should handle file existence check error', async () => {
      const mockError = new Error('File existence check failed');
      (fs.pathExists as jest.Mock).mockRejectedValue(mockError);

      await expect(FileSystem.fileExists(testFile)).rejects.toThrow(mockError);
      expect(Logger.error).toHaveBeenCalledWith(expect.stringContaining(testFile));
    });
  });

  describe('readFile', () => {
    it('should read file content', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(testContent);

      const content = await FileSystem.readFile(testFile);

      expect(fs.readFile).toHaveBeenCalledWith(testFile, 'utf-8');
      expect(content).toBe(testContent);
    });

    it('should handle file read error', async () => {
      const mockError = new Error('File read failed');
      (fs.readFile as jest.Mock).mockRejectedValue(mockError);

      await expect(FileSystem.readFile(testFile)).rejects.toThrow(mockError);
      expect(Logger.error).toHaveBeenCalledWith(expect.stringContaining(testFile));
    });
  });

  describe('resolvePath', () => {
    it('should resolve path correctly', () => {
      const resolvedPath = FileSystem.resolvePath('/base', 'path', 'to', 'file');

      expect(resolvedPath).toBe(path.resolve('/base', 'path', 'to', 'file'));
    });
  });
});
