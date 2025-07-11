// Импортируем основной API сервис для работы с проектами
// Этот сервис был создан в файле '../index'
import projectsApi from '../index';

// Создаем тип данных для формы создания проекта
// Omit убирает поле 'id' из типа ProjectType, так как при создании проекта
// мы не должны указывать id, он будет сгенерирован на сервере
// type FormPayload = Omit<ProjectType, 'id'>;

// Расширяем базовый API сервис новыми возможностями
// enhanceEndpoints позволяет добавить новые типы тегов и другие настройки
// injectEndpoints добавляет новые эндпоинты для работы с API
const projectsApiEndpoints = projectsApi
  .enhanceEndpoints({
    addTagTypes: ['Projects'],
  })
  .injectEndpoints({
    // Определяем конкретные эндпоинты для работы с проектами
    endpoints: (builder) => ({
      // Метод для получения списка проектов
      // Возвращает массив объектов ProjectType
      getProjects: builder.mutation<ProjectType[], void>({
        query: () => ({
          url: '/projects/my',
          method: 'GET',
        }),
        // При успешном выполнении запроса обновляем все теги 'Project'
        invalidatesTags: ['Projects'],
      }),
      // getCurrentProject: builder.mutation<ProjectType, void>({
      //   query: () => ({
      //     url: '/projects/current',
      //     method: 'GET',
      //   }),
      //   // При успешном выполнении запроса обновляем все теги 'Project'
      //   // invalidatesTags: ['Project'],
      // }),
      // getProject: builder.mutation<ProjectType, number>({
      //   query: (id: number) => ({
      //     url: `/projects/${id}`,
      //     method: 'GET',
      //   }),
      //   // При успешном выполнении запроса обновляем все теги 'Project'
      //   // invalidatesTags: ['Project'],
      // }),
      // Метод для создания нового проекта
      // Принимает данные формы (без поля id) и возвращает созданный проект
      // createProject: builder.mutation<ProjectType, FormPayload>({
      //   query: (data: FormPayload) => ({
      //     url: '/projects',
      //     method: 'POST',
      //     body: data,
      //   }),
      //   invalidatesTags: ['Projects'],
      // }),

      // updateProject: builder.mutation<ProjectType, FormPayload & { id: number}>({
      //   query: (data: FormPayload & { id: number}) => ({
      //     url: `/projects/${data.id}`,
      //     method: 'PATCH',
      //     body: data,
      //   }),
      //   invalidatesTags: ['Projects'],
      // }),

      // setActiveProject: builder.mutation<ProjectType, number>({
      //   query: (id: number) => ({
      //     url: `/projects/${id}`,
      //     method: 'PUT',
      //     // body: data,
      //   }),
      // }),
    }),
  });

// Экспортируем хуки для использования в компонентах
// useGetProjectsMutation - для получения списка проектов
// useCreateProjectMutation - для создания нового проекта
export const {
  useGetProjectsMutation,
  // useCreateProjectMutation,
  // useGetCurrentProjectMutation,

  // useSetActiveProjectMutation,
  // useGetProjectMutation,
  // useUpdateProjectMutation,
} = projectsApiEndpoints;

// Экспортируем весь расширенный API сервис
// Это может понадобиться для доступа к другим методам или настройкам
export { projectsApiEndpoints };
