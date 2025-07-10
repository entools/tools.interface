// Импортируем основной API сервис для работы с проектами
// Этот сервис был создан в файле '../index'
import projectApi from '../index';

// Создаем тип данных для формы создания проекта
// Omit убирает поле 'id' из типа ProjectType, так как при создании проекта
// мы не должны указывать id, он будет сгенерирован на сервере
type FormPayload = Omit<ProjectType, 'id'>;

// Расширяем базовый API сервис новыми возможностями
// enhanceEndpoints позволяет добавить новые типы тегов и другие настройки
// injectEndpoints добавляет новые эндпоинты для работы с API
const projectApiEndpoints = projectApi
  .enhanceEndpoints({
    addTagTypes: ['Project'],
  })
  .injectEndpoints({
    // Определяем конкретные эндпоинты для работы с проектами
    endpoints: (builder) => ({
      // Метод для получения списка проектов
      // Возвращает массив объектов ProjectType
      getProjects: builder.mutation<ProjectType[], void>({
        query: () => ({
          url: '/projects',
          method: 'GET',
        }),
        // При успешном выполнении запроса обновляем все теги 'Project'
        invalidatesTags: ['Project'],
      }),
      // Метод для создания нового проекта
      // Принимает данные формы (без поля id) и возвращает созданный проект
      createProject: builder.mutation<ProjectType, FormPayload>({
        query: (data: FormPayload) => ({
          url: '/projects',
          method: 'POST',
          body: data,
        }),
      }),
    }),
  });

// Экспортируем хуки для использования в компонентах
// useGetProjectsMutation - для получения списка проектов
// useCreateProjectMutation - для создания нового проекта
export const { useGetProjectsMutation, useCreateProjectMutation } = projectApiEndpoints;

// Экспортируем весь расширенный API сервис
// Это может понадобиться для доступа к другим методам или настройкам
export { projectApiEndpoints };
