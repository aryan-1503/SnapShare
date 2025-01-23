import { getUser } from "../utils/getUser.js";
import jwt from "jsonwebtoken";
import {UserModel} from "../models/UserSchema.js";
import {getOrSetCache} from "../utils/getOrSetCache.js";

const userEvents = async (req,res) => {
    const userId = req.user._id;
    const events = await getOrSetCache(`user:${userId}/events`, async () => {
        const user = await UserModel.findById(userId).populate("events");
        return user.events;
    })
    return res.json(events)
}

export { userEvents }