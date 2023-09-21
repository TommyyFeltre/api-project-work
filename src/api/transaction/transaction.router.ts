import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { validate } from "../../utils/validation.middleware";
import { AddTransactionDTO, AddTransactionRegDTO } from "./transaction.dto";
import { addRegister } from "./transaction.controller";

const router = Router();

router.use(isAuthenticated);
router.post('/', validate(AddTransactionRegDTO), addRegister);

export default router;