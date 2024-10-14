import { getUser } from "../utils/getUser.js";
import jwt from "jsonwebtoken";
import {UserModel} from "../models/UserSchema.js";
import {getOrSetCache} from "../utils/getOrSetCache.js";

const userEvents = async (req,res) => {
    const events = await getOrSetCache("events", () => {
        const user = req.user;
        return user.events;
    })
    return res.json(events)
}

export { userEvents }