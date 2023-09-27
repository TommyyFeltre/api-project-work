import { Router } from "express";
import { AddUserDTO, LoginDTO, changePasswordDTO } from "./auth.dto";
import { add, login } from "./auth.controller";
import { validate } from "../../utils/auth/validation.middleware";


const router = Router();


export default router;