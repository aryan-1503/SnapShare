import { Router } from "express";
import multer from "multer";
import {createNewEvent, getSingleEvent, updateSingleEvent} from "../controllers/new-event.controller.js";

const newEventRoute = Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'events');
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`
        cb(null, encodeURIComponent(uniqueName));
    }
});

const upload = multer({ storage });

newEventRoute
    .post("/create", upload.single('eventPhoto'), createNewEvent)
    .get("/:id",getSingleEvent)
    .patch("/edit-event/:id", upload.single('eventPhoto'),updateSingleEvent)

export { newEventRoute };
