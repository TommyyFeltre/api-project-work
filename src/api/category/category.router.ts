import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { AddCategoryDTO } from "./category.dto";
import { add } from "./category.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";

const router = Router();

router.use(isAuthenticated);
router.post('', validate(AddCategoryDTO), add);

export default router;