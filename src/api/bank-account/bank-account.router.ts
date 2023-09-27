import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { account } from "./bank-account.controller";

const router = Router();

router.use(isAuthenticated);
router.get('/account', account);


export default router;