export enum CATEGORY {
  RELAX = 'relax',
  SLEEP = 'sleep',
  FOCUS = 'focus'
};

export interface State {
  id: string;
  title: string;
  category: CATEGORY;
  icon: string;
};