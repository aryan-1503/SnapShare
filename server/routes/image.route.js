import { Router } from "express";
import {getEventImages, uploadImages} from "../controllers/image.controller.js";
import multer from "multer";

const imageRoute = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage})

imageRoute
    .post("/upload/:id",upload.array('image',10),uploadImages)
    .get("/:id",getEventImages)

export { imageRoute }