import { Router } from 'express';
import TransactionRouter from './transactions/transactions.router';

const router = Router();
router.use("/transaction", TransactionRouter);

export default router;

