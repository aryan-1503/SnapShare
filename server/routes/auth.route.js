import { Router } from "express"
import "dotenv/config"
import {login, logout, register, verify, me} from "../controllers/auth.controller.js";
const authRouter = Router();


authRouter
    .post("/register",register)
    .post("/login",login)
    .post("/logout",logout)
    .get("/me", me)
    .post("/verify",verify)

export { authRouter }
