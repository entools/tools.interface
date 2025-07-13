// Экспортируем основные API сервисы под определенными именами
// Каждый сервис отвечает за свою область функциональности
// authApi - для аутентификации и авторизации
export { default as authApi } from './auth-api/index';

// profileApi - для работы с профилем пользователя
export { default as profileApi } from './profile-api/index';

// projectApi - для работы с проектами
export { default as projectApi } from './project-api/index';

export { default as projectsApi } from './projects-api/index';
export { default as documentApi } from './document-api/index';
export { default as blockApi } from './block-api/index';
export { default as rainRunoffItemApi } from './rain-runoff-item-api/index';

// Экспортируем все эндпоинты (endpoints) из соответствующих модулей
// Это позволяет использовать конкретные запросы напрямую в компонентах
// Экспортируются все экспортируемые значения (*) из каждого файла

// Экспортируем все эндпоинты для аутентификации
// Включает запросы на регистрацию, авторизацию, выход и т.д.
export * from './auth-api/endpoints/index';

// Экспортируем все эндпоинты для профиля
// Включает запросы на получение, обновление профиля и т.д.
export * from './profile-api/endpoints/index';

// Экспортируем все эндпоинты для проектов
// Включает запросы на создание, редактирование, получение проектов и т.д.
export * from './projects-api/endpoints/index';

export * from './project-api/endpoints/index';

export * from './document-api/endpoints/index';
export * from './block-api/endpoints/index';
export * from './rain-runoff-item-api/endpoints/index';
