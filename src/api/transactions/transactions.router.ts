import { validate } from "../../utils/auth/validation.middleware";
import { Router } from "express";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { listByCategoryDTO, listByPeriodDTO, listDTO, transactionDTO } from "./transactions.dto";
import { bankTransfer, categoryMovementsList, movementsList, periodMovementsList } from "./transactions.controller";

const router = Router();
router.post("/", validate(transactionDTO), bankTransfer)
router.get("/", validate(listDTO), movementsList)
router.get("/byCategory", validate(listByCategoryDTO), categoryMovementsList)
router.get("/byPeriod", validate(listByPeriodDTO), periodMovementsList)


export default router;