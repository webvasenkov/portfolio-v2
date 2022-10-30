import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICommand, ITerminalState } from 'app/types';

const initialState: ITerminalState = {
  history: [],
  currentCommand: '',
  commands: [],
  isLoadingData: false,
  isTerminal: false,
};

export const terminalSlice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    setIsTerminal(state, action: PayloadAction<boolean>) {
      state.isTerminal = action.payload
    },
    setIsLoadingData(state, action: PayloadAction<boolean>) {
      state.isLoadingData = action.payload;
    },
    setCurrentCommand(state, action: PayloadAction<string>) {
      state.currentCommand = action.payload;
    },
    addCommand(state, action: PayloadAction<Omit<ICommand, 'id'>>) {
      const command = { id: String(+new Date()), ...action.payload };
      state.history.push(command);

      if (action.payload.name == 'clear') {
        state.commands = [];
      } else {
        state.commands.push(command);
      }
    },
  },
});

export const { setIsLoadingData, addCommand, setCurrentCommand, setIsTerminal } =
  terminalSlice.actions;
