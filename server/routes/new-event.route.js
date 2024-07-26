import { Router } from "express";
import multer from "multer";
import { eventModel } from "../models/EventSchema.js";

const newEventRoute = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'events');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

newEventRoute
    .post("/create", upload.single('eventPhoto'), async (req, res) => {
        const eventPhoto = req.file;
        const { eventName, category } = req.body;
        try {
            if (!eventPhoto) {
                return res.json({ message: "Image not found!" });
            }
            const newEvent = new eventModel({
                eventName,
                eventPhoto: eventPhoto.path,
                category
            });
            const savedEvent = await newEvent.save();
            return res.status(200).json({ message: "New event created!", event: savedEvent });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Internal Server Error" });
        }
    });

export { newEventRoute };
