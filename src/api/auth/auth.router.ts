import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { AddUserDTO, LoginDTO, ResetPasswordDTO } from "./auth.dto";
import { add, login, resetPassword } from "./auth.controller";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";


const router = Router();

router.post('/register', validate(AddUserDTO, 'body'), add);
router.post('/login', validate(LoginDTO), login);
router.post('/reset', isAuthenticated, validate(ResetPasswordDTO, 'body'), resetPassword);

export default router;