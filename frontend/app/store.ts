import { configureStore } from '@reduxjs/toolkit';
import { projectsApi } from '../features/projects/projectsApi';

export const store = configureStore({
  reducer: { [projectsApi.reducerPath]: projectsApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
