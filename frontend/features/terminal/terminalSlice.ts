import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITerminalState } from 'app/types';

const initialState: ITerminalState = {
  history: [],
  commands: [],
  isLoadingData: false,
};

export const terminalSlice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    setIsLoadingData(state, action: PayloadAction<boolean>) {
      state.isLoadingData = action.payload;
    },
    addCommand(state, action: PayloadAction<string>) {
      const command = { id: String(+new Date()), name: action.payload };
      state.history.push(command);

      if (action.payload == 'clear') {
        state.commands = [];
      } else {
        state.commands.push(command);
      }
    },
  },
});

export const { setIsLoadingData, addCommand } = terminalSlice.actions;
