// Импортируем функцию createSlice из Redux Toolkit
// Она позволяет создавать slice (часть состояния) с минимальными усилиями
import { createSlice } from '@reduxjs/toolkit';

// Импортируем эндпоинты API для работы с проектами
// Это позволит нам обрабатывать действия, связанные с API
import { projectApiEndpoints } from '../api/project-api/endpoints/index';

// Импортируем тип RootState для создания селектора
// Это позволит нам правильно типизировать наш селектор
import type { RootState } from '..';

// Определяем тип состояния для проектов
// data - массив проектов типа ProjectType
type InfoState = {
  data: ProjectType[],
};

// Устанавливаем начальное состояние
// При старте приложения массив проектов будет пустым
export const initialStateProject: InfoState = {
  data: [],
};

// Создаем slice для управления проектами
// name - уникальный идентификатор slice
// initialState - начальное состояние
// reducers - обычные редукторы (здесь пустые)
// extraReducers - дополнительные редукторы для обработки действий
const slice = createSlice({
  name: 'project',
  initialState: initialStateProject,
  reducers: {},
  extraReducers: (builder) => {
    // Добавляем обработчик для успешного выполнения запроса getProjects
    // При успешном получении проектов обновляем состояние
    builder
      .addMatcher(
        projectApiEndpoints.endpoints.getProjects.matchFulfilled,
        (state, action) => ({ ...state, data: action.payload }),
      );
  },
});

// Экспортируем редуктор slice
// Он будет добавлен в store для управления состоянием проектов
export default slice.reducer;

// Создаем селектор для получения данных о проектах
// Принимает state и возвращает массив проектов
export const projectSelector = (state: RootState) => state.project.data;
