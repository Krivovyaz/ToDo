import { Request, Response } from 'express';
import { TodoDto } from '../interface';
import { TodoService } from '../service';
import {
  ERROR_MESSAGES,
  STATUS_CODES,
  SUCCESS_MESSAGES,
} from '../../../consts/statusCodes';

export class TodoController {
  private todoService: TodoService = new TodoService();

  public addTodo = async (req: Request, res: Response) => {
    try {
      const { title }: TodoDto = req.body;

      const todo = await this.todoService.addTodo(title);

      res.send(todo);
    } catch (e) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: ERROR_MESSAGES.TODO.SAVE,
      });
    }
  };

  public getTodos = async (req: Request, res: Response) => {
    try {
      const search = req.query.search as string | undefined;

      const todos = this.todoService.getTodos(search);

      res.send(todos);
    } catch (e) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: ERROR_MESSAGES.TODO.GET_TODOS,
      });
    }
  };

  public deleteTodo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      this.todoService.deleteTodo(id);

      res.json({
        message: SUCCESS_MESSAGES.DELETE_TODO,
      });
    } catch (e) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: ERROR_MESSAGES.TODO.DELETE,
      });
    }
  };

  public completeTodo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      this.todoService.completeTodo(id);

      res.json({
        message: SUCCESS_MESSAGES.COMPLETE_TODO,
      });
    } catch (e) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: ERROR_MESSAGES.TODO.INTERNAL_SERVER_ERROR,
      });
    }
  };

  public updateTodo = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const payload = req.body;

      this.todoService.updateTodo(id, payload);

      res.json({
        message: SUCCESS_MESSAGES.UPDATE_TODO,
      });
    } catch (e) {
      res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message: ERROR_MESSAGES.TODO.INTERNAL_SERVER_ERROR,
      });
    }
  };
}
