import { validate } from "../../utils/auth/validation.middleware";
import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { transactionDTO } from "./transactions.dto";
import { bankTransfer } from "./transactions.controller";

const router = Router();
router.post("/", validate(transactionDTO), bankTransfer)


export default router;