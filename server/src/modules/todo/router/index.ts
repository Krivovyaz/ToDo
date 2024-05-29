import { Router } from 'express';
import { TodoController } from '../controller';

const router = Router();
const todoController = new TodoController();

router.post('/', todoController.addTodo);
router.get('/', todoController.getTodos);
router.delete('/:id', todoController.deleteTodo);
router.patch('/complete/:id', todoController.completeTodo);
router.patch('/:id', todoController.updateTodo);

export default router;
