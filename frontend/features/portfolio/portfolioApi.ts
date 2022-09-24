import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProject, ITool, ISocial } from 'app/types';

export const portfolioApi = createApi({
  reducerPath: 'portfolio',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (build) => ({
    getProjects: build.query<{ projects: IProject[] }, void>({
      query: () => '/projects',
    }),
    getTools: build.query<{ tools: ITool[] }, void>({
      query: () => '/tools',
    }),
    getSocials: build.query<{ socials: ISocial[] }, void>({
      query: () => '/socials',
    }),
  }),
});

export const { useGetProjectsQuery, useGetToolsQuery, useGetSocialsQuery } =
  portfolioApi;
