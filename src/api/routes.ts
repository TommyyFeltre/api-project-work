import { Router } from 'express';
import TransactionRouter from './transactions/transactions.router';
import BankAccountRouter from './bankAccount/bankAccount.router';

const router = Router();
router.use("/transaction", TransactionRouter);
router.use("/account", BankAccountRouter);

export default router;

