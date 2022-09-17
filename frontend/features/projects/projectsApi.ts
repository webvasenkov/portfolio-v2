import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProject } from '../../app/types';

export const projectsApi = createApi({
  reducerPath: 'projects',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.webvasenkov.com' }),
  endpoints: (build) => ({
    getProjects: build.query<IProject[], void>({
      query: () => '/projects',
    }),
  }),
});

export const { useGetProjectsQuery } = projectsApi;
