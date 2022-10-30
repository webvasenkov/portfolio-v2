import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProject, ITool, ISocial, IMessagePayload } from 'app/types';

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
    sendMessage: build.mutation({
      query: (messagePayload: IMessagePayload) => ({
        url: '/mail/gmail',
        method: 'POST',
        body: messagePayload,
      }),
    }),
  }),
});

export const { useGetProjectsQuery, useGetToolsQuery, useGetSocialsQuery, useSendMessageMutation } =
  portfolioApi;
