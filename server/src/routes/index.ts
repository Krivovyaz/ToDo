import { Router } from 'express';
import todoRouter from '../modules/todo/router';

const router = Router();

router.use('/todos', todoRouter);

export default router;
