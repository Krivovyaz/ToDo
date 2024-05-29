import { ERROR_MESSAGES } from '../../../consts/statusCodes';
import { Store, Todo, UpdateTodoDTO } from '../interface';
import { v4 as uuidv4 } from 'uuid';

export class TodoService {
  private store: Store = {
    todos: [],
  };

  public addTodo = (title: string): Todo => {
    const todo: Todo = {
      title,
      id: uuidv4(),
      isCompleted: false,
    };

    return this.save(todo);
  };

  public getTodos = (search: string | undefined): Todo[] => {
    return this.get(search);
  };

  public deleteTodo = (id: string) => {
    const todo = this.findById(id);

    if (!todo) {
      throw new Error(ERROR_MESSAGES.TODO.NO_TODO);
    }

    return this.deleteById(id);
  };

  public completeTodo = (id: string) => {
    const todo = this.findById(id);

    if (!todo) {
      throw new Error(ERROR_MESSAGES.TODO.NO_TODO);
    }

    return this.findAndUpdate(id, {
      isCompleted: true,
    });
  };

  public updateTodo = (id: string, payload: UpdateTodoDTO) => {
    const todo = this.findById(id);

    if (!todo) {
      throw new Error(ERROR_MESSAGES.TODO.NO_TODO);
    }

    return this.findAndUpdate(id, payload);
  };

  private save = (todo: Todo) => {
    this.store.todos.push(todo);

    return todo;
  };

  private get = (search: string | undefined): Todo[] => {
    if (search) {
      return this.store.todos.filter((todo) =>
        JSON.stringify(todo).includes(search)
      );
    }

    return this.store.todos;
  };

  private findById = (id: string): Todo | undefined => {
    return this.store.todos.find((todo) => todo.id === id);
  };

  private findAndUpdate = (id: string, payload: UpdateTodoDTO) => {
    const todoIndex = this.store.todos.findIndex((todo) => todo.id === id);
    const todo = this.store.todos[todoIndex];

    if (todoIndex !== -1) {
      this.store.todos[todoIndex] = {
        ...todo,
        ...payload,
      };
    }

    return this.store.todos[todoIndex];
  };

  private deleteById = (id: string) => {
    this.store.todos = this.store.todos.filter((todo) => todo.id !== id);
  };
}
