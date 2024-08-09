import {eventModel} from "../models/EventSchema.js";
import jwt from "jsonwebtoken";
import {UserModel} from "../models/UserSchema.js";


const createNewEvent = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "Token not present"})
    }
    const eventPhoto = req.file;
    const { eventName, categories, description,eventTime } = req.body;
    const data = await jwt.verify(token, process.env.SECRET);
    if (!data) return res.status(401).json({ message: "Unauthorized" });
    const id = data.id;
    const user = await UserModel.findById(id);
    try {
        if (!eventPhoto) {
            return res.json({ message: "Image not found!" });
        }
        const eventPhotoPath = encodeURIComponent(eventPhoto.path);

        const newEvent = new eventModel({
            eventName,
            eventPhoto: eventPhotoPath,
            categories,
            description,
            eventTime
        });

        const savedEvent = await newEvent.save();
        user.events.push(savedEvent._id);
        await user.save();

        return res.status(200).json({ message: "New event created!", event: savedEvent });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


export { createNewEvent }