import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { validate } from "../../utils/validation.middleware";
import { AddTransactionDTO, AddTransactionRegDTO } from "./transaction.dto";
import { add, addRegister } from "./transaction.controller";

const router = Router();

router.use(isAuthenticated);
router.post('/', validate(AddTransactionRegDTO), addRegister);
router.post('/add', validate(AddTransactionDTO), add);

export default router;