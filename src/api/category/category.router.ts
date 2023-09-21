import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { AddCategoryDTO } from "./category.dto";
import { add } from "./category.controller";

const router = Router();

router.post('', validate(AddCategoryDTO), add);

export default router;