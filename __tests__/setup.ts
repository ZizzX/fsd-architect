// Глобальные настройки для тестов
import { Logger } from '../src/utils';

// Отключаем логирование во время тестов
beforeAll(() => {
  Logger.configure({ silent: true });
});
