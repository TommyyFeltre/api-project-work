import { Router } from 'express';
import authRouter from './auth/auth.router';
import categoryRouter from './category/category.router';
import transactionRouter from './transaction/transaction.router';

const router = Router();

router.use(authRouter);
router.use('/category', categoryRouter);
router.use('/transaction', transactionRouter);

export default router;