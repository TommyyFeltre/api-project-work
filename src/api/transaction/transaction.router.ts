import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { validate } from "../../utils/validation.middleware";
import { AddTransactionDTO, AddTransactionRegDTO, FindTransByNumCatDTO, FindTransByNumDTO } from "./transaction.dto";
import { add, addRegister, listByNumCategory, listByNumber } from "./transaction.controller";

const router = Router();

router.use(isAuthenticated);
router.post('/', validate(AddTransactionRegDTO), addRegister);
router.post('/add', validate(AddTransactionDTO), add);
router.post('/byNum',validate(FindTransByNumDTO), listByNumber);
router.post('byNumAndCategory', validate(FindTransByNumCatDTO), listByNumCategory);

export default router;