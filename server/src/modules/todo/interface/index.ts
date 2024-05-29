export interface TodoDto {
  title: string;
}

export interface Todo {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Store {
  todos: Todo[];
}

export interface UpdateTodoDTO {
  title?: string;
  isCompleted?: boolean;
}
