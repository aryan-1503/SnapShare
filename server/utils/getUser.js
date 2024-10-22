import jwt from "jsonwebtoken";
import {UserModel} from "../models/UserSchema.js";

const getUser = async (req,res,next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ msg: "Unauthorized" });
    }
    const data = await jwt.verify(token, process.env.SECRET);

    if (!data) {
        return res.status(401).json({ msg: "data Unauthorized" });
    }
    const id = data.id
    const user = await UserModel.findById(id);
    req.user = user;
    next()

}
export { getUser }