import { validate } from "../../utils/auth/validation.middleware";
import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { accountDTO } from "./bankAccount.dto";
import { myAccount } from "./bankAccount.controller";

const router = Router();
router.get("/", validate(accountDTO), myAccount);


export default router;