export interface ICommand {
  id: string;
  name: string;
}

export interface ITag {
  _id: string,
  name: string,
}

export interface IProject {
  _id: string;
  imgUrl: string;
  link: string;
  tags: ITag[];
  title: string;
}
