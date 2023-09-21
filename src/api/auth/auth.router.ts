import { Router } from "express";
import { AddUserDTO, LoginDTO } from "./auth.dto";
import { add, login } from "./auth.controller";


const router = Router();


export default router;