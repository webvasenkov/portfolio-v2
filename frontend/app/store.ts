import { configureStore } from '@reduxjs/toolkit';
import { portfolioApi } from 'features/portfolio/portfolioApi';
import { terminalSlice } from 'features/terminal/terminalSlice';

export const store = configureStore({
  reducer: {
    [portfolioApi.reducerPath]: portfolioApi.reducer,
    [terminalSlice.name]: terminalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(portfolioApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
