export interface ITodo {
  id: number;
  text: string;
  completed: boolean;
}

export enum TodoListFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}
