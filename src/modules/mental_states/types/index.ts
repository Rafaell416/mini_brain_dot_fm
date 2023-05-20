export enum CATEGORY {
  RELAX = 'RELAX',
  SLEEP = 'SLEEP',
  FOCUS = 'FOCUS'
}

export interface State {
  id: string;
  title: string;
  category: CATEGORY;
  icon: string;
}