import {eventModel} from "../models/EventSchema.js";
import jwt from "jsonwebtoken";
import {UserModel} from "../models/UserSchema.js";
import axios from "axios";

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

const getSingleEvent = async (req,res) => {
    const id  = req.params.id;
    try{
        const event = await eventModel.findById(id);
        if (!event){
            return res.status(404).json({ message : "Event not Found"});
        }
        return res.status(200).json({message: "Event Found", event})
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateSingleEvent = async (req, res) => {
    const { id } = req.params;
    const { eventName, categories, description, eventTime } = req.body;

    const eventPhoto = req.file;

    try {
        const updatedData = {
            eventName,
            categories,
            description,
            eventTime
        };

        if (eventPhoto) {
            updatedData.eventPhoto = encodeURIComponent(eventPhoto.path);
        }

        const updatedEvent = await eventModel.findByIdAndUpdate(id, updatedData, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ message: "Event not found" });
        }

        return res.status(200).json({ message: "Event updated successfully", event: updatedEvent });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const generateQrCode = async (req,res) => {
    try {
        const response = await axios.post('https://api.qr-code-generator.com/v1/create?access-token=your-access-token', req.body);
        res.status(200).json(response.data);
    }catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal Server Error"})
    }
}
export { createNewEvent, getSingleEvent, updateSingleEvent, generateQrCode }