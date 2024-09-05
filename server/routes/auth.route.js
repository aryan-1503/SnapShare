import { Router } from "express"
import "dotenv/config"
import {login, logout, register, verify, me, deleteUser} from "../controllers/auth.controller.js";
const authRouter = Router();


authRouter
    .post("/register",register)
    .post("/login",login)
    .post("/logout",logout)
    .get("/me", me)
    .post("/verify",verify)
    .delete("/delete-user/:id", deleteUser)

export { authRouter }
