import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGeneralState } from 'app/types';

const initialState: IGeneralState = {
  messageInView: false,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setMessageInView(state, action: PayloadAction<boolean>) {
      state.messageInView = action.payload;
    },
  },
});

export const { setMessageInView } = generalSlice.actions;
