export enum TodoStatus {
  TO_DO = 'To Do',
  DONE = 'Done',
}

export interface Todo {
  id: number;
  title: string;
  status: TodoStatus;
}
