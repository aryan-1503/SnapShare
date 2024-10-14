import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ImageModel } from "../models/ImageSchema.js";
import crypto from "crypto";
import { eventModel } from "../models/EventSchema.js";
import { getOrSetCache } from "../utils/getOrSetCache.js";

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.ACCCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    },
    region: process.env.BUCKET_REGION
});

// Upload images
const uploadImages = async (req, res) => {
    const { id } = req.params;
    const { uploaderName, category } = req.body;
    try {
        const event = await eventModel.findById(id);
        for (const file of req.files) {
            const imageName = randomImageName();
            const command = new PutObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: imageName,
                Body: file.buffer,
                ContentType: file.mimetype
            });
            await s3.send(command);

            const newImage = new ImageModel({
                image: imageName,
                uploaderName,
                category
            });
            const savedImage = await newImage.save();
            event.images.push(savedImage._id);
        }

        await event.save();
        return res.status(200).json({ message: "Images Uploaded", event });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Get event images
const getEventImages = async (req, res) => {
    const { id } = req.params;
    try {
        const images = await getOrSetCache(`event:${id}`, async () => {
            const event = await eventModel.findById(id).populate('images');
            for (const image of event.images) {
                const command = new GetObjectCommand({
                    Bucket: process.env.BUCKET_NAME,
                    Key: image.image,
                    ResponseContentDisposition: `attachment; filename="${image.image}.jpg"`
                });
                const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                image.imageUrl = url;
                await image.save();
            }

            const finalImages = await eventModel.findById(id).populate('images');
            return finalImages.images;
        });

        return res.status(200).json({ message: "Images Retrieved", images });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

// Delete an image
const deleteImage = async (req, res) => {
    const { id } = req.params;
    const { eventId } = req.params;
    try {
        const image = await ImageModel.findById(id);
        const event = await eventModel.findById(eventId);
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: image.image
        };
        const command = new DeleteObjectCommand(params);
        await s3.send(command);

        event.images = event.images.filter((prevImageId) => prevImageId.toString() !== id);
        await event.save();
        await ImageModel.findOneAndDelete(id);

        return res.status(201).json({ message: "Image Deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export { uploadImages, getEventImages, deleteImage };
