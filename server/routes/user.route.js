import { Router } from "express";
import {userEvents} from "../controllers/user.controller.js";

const userRoute = Router();

userRoute
    .get("/events",userEvents)

export { userRoute };