import projectsApi from '../index';

const projectsApiEndpoints = projectsApi
  .enhanceEndpoints({
    addTagTypes: ['Projects'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getProjects: builder.mutation<ProjectType[], void>({
        query: () => ({
          url: '/projects/my',
          method: 'GET',
        }),
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

export const {
  useGetProjectsMutation,
} = projectsApiEndpoints;

export { projectsApiEndpoints };
