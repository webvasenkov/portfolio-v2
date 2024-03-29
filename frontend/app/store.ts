import { configureStore } from '@reduxjs/toolkit';
import { generalSlice } from 'features/general/generalSlice';
import { portfolioApi } from 'features/portfolio/portfolioApi';
import { terminalSlice } from 'features/terminal/terminalSlice';

export const store = configureStore({
  reducer: {
    [portfolioApi.reducerPath]: portfolioApi.reducer,
    [terminalSlice.name]: terminalSlice.reducer,
    [generalSlice.name]: generalSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(portfolioApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
