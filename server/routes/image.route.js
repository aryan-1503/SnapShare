import { Router } from "express";
import {deleteImage, getEventImages, uploadImages} from "../controllers/image.controller.js";
import multer from "multer";

const imageRoute = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage})


// TODO: new route -> delete all images feature

imageRoute
    .post("/upload/:id",upload.array('image',10),uploadImages)
    .get("/:id",getEventImages)
    .delete("/delete/:eventId/:id", deleteImage)


export { imageRoute }