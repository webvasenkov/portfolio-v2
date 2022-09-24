export interface ICommand {
  id: string;
  name: string;
}

export interface ITool {
  id: string;
  name: string;
}

export interface IProject {
  id: string;
  img: string;
  link: string;
  tools: ITool[];
  name: string;
  desc: string;
}

export interface ISocial {
  id: string;
  name: string;
  link: string;
}

export interface ITerminalState {
  history: ICommand[];
  commands: ICommand[];
  isLoadingData: boolean;
}
