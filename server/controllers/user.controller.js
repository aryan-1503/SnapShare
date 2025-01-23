import { UserModel } from "../models/UserSchema.js";

const userEvents = async (req, res) => {
    const userId = req.user._id;
    try {
        const user = await UserModel.findById(userId).populate("events");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(user.events);
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export { userEvents };