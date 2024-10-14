import { Router } from "express";
import {userEvents} from "../controllers/user.controller.js";
import {getUser} from "../utils/getUser.js";

const userRoute = Router();

userRoute
    .get("/events",getUser,userEvents)

export { userRoute };