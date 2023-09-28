import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { validate } from "../../utils/validation.middleware";
import { AddTransactionDTO, AddTransactionRegDTO, BankTransferDTO, FindTransByNumCatDTO, phoneTopUpDTO } from "./transaction.dto";
import { add, addRegister, bankTransfer, list, phoneTopUp } from "./transaction.controller";

const router = Router();

router.use(isAuthenticated);
router.post('/', validate(AddTransactionRegDTO), addRegister);
router.post('/add', validate(AddTransactionDTO), add);
router.post('/list', validate(FindTransByNumCatDTO), list);
router.post('/phoneTopUp', validate(phoneTopUpDTO), phoneTopUp);
router.post('/bankTransfer', validate(BankTransferDTO), bankTransfer);


export default router;