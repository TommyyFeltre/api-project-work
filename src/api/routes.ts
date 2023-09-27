import { Router } from 'express';
import authRouter from './auth/auth.router';
import userRouter from './user/user.router';
import transactionRouter from './transaction/transaction.router';

const router = Router();

router.use(authRouter);
router.use('/users', userRouter);
router.use('/transaction', transactionRouter);

export default router;