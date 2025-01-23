import {eventModel} from "../models/EventSchema.js";
import jwt from "jsonwebtoken";
import {UserModel} from "../models/UserSchema.js";
import axios from "axios";
import {GetObjectCommand, PutObjectCommand, S3Client} from "@aws-sdk/client-s3";
import crypto from "crypto";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";


const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    },
    region: process.env.BUCKET_REGION
});
const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');


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
            return res.status(404).json({ message: "Image not found!" });
        }
        const eventPhotoPath = eventPhoto.path;

        const eventPhotoName = randomImageName();
        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: eventPhotoName,
            Body: eventPhoto.buffer,
            ContentType: eventPhoto.mimetype
        });
        await s3.send(command);

        const newEvent = new eventModel({
            eventName,
            eventPhoto: eventPhotoName,
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
        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: event.eventPhoto,
            ResponseContentDisposition: `attachment; filename="${event.eventPhoto}.jpg"`
        });
        event.eventPhotoUrl = await getSignedUrl(s3, command, {expiresIn: 3600});
        await event.save();
        return res.status(200).json({message: "Event Found", event})
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateSingleEvent = async (req, res) => {
    const { id } = req.params;
    const { eventName, categories, description, eventTime, subEvent } = req.body;

    const eventPhoto = req.file;

    try {
        const updatedData = {
            eventName,
            categories,
            description,
            eventTime,
            subEvent
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
        const response = await axios.post('https://api.qr-code-generator.com/v1/create?access-token=frEV8xWL7YDKjK_bbDpfUwBc-6H64BnOC7Z1lSepvcWLl3ZZKCqDDS9JEklf6msg', req.body);
        res.status(200).json(response.data);
    }catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal Server Error"})
    }
}

const deleteEvent = async (req,res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "Token not present"})
    }
    const data = await jwt.verify(token, process.env.SECRET);
    if (!data) return res.status(401).json({ message: "Unauthorized" });
    const id = data.id;

    const { eventId } = req.params;
    try{
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found"});
        }
        user.events = user.events.filter(prevEventId => prevEventId.toString() !== eventId)
        user.save()
        await eventModel.findByIdAndDelete(eventId);
        return res.status(201).json({ message: "Event deleted"})

    }catch (e) {
        console.log(e)
        res.status(500).json({ message: "Internal Server Error"})
    }
}

export { createNewEvent, getSingleEvent, updateSingleEvent, generateQrCode, deleteEvent }