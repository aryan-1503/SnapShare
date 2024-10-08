import { Router } from "express";
import multer from "multer";
import {
    createNewEvent,
    deleteEvent,
    generateQrCode,
    getSingleEvent,
    updateSingleEvent
} from "../controllers/new-event.controller.js";

const eventRoute = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'events');
    },
    filename: (req, file, cb) => {
        const fileExtension = file.originalname.split('.').pop();
        const uniqueName = `${Date.now()}.${fileExtension}`

        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

eventRoute
    .post("/create", upload.single('eventPhoto'), createNewEvent)
    .get("/:id",getSingleEvent)
    .patch("/edit-event/:id", upload.single('eventPhoto'),updateSingleEvent)
    .post("/generate-qr-code", generateQrCode)
    .delete("/delete-event/:eventId",deleteEvent)

export { eventRoute };
