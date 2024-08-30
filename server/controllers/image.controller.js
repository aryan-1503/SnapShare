import {S3Client, PutObjectCommand, GetObjectCommand} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {ImageModel} from "../models/ImageSchema.js";
import crypto from "crypto"
import {eventModel} from "../models/EventSchema.js";

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

const s3 = new S3Client({
    credentials : {
        accessKeyId : process.env.ACCCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS_KEY
    },
    region: process.env.BUCKET_REGION

})
const uploadImages = async (req,res) => {
    const { id } = req.params;
    const { uploaderName,category } = req.body
    try {
        const event = await eventModel.findById(id);
        for (const file of req.files){
            const imageName = randomImageName()
            const command = new PutObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: imageName,
                Body: file.buffer,
                ContentType: file.mimetype
            });
            await s3.send(command)
            const newImage = new ImageModel({
                image: imageName,
                uploaderName: uploaderName,
                category: category
            })
            const savedImage = await newImage.save();
            event.images.push(savedImage._id)
        }

        await event.save()

        return res.status(200).json({ message: "Images Uploaded",event})
    }catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

const getEventImages = async (req,res) => {
    const { id } = req.params
    try{
        const event  = await eventModel.findById(id).populate('images');
        for (const image of event.images){
            const img = await ImageModel.findById(image._id);
            const command = new GetObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: image.image,
                ResponseContentDisposition: `attachment; filename="${image.image}.jpg"`
            });
            const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
            img.imageUrl = url;
            await img.save();
        }

        const finalImages = await eventModel.findById(id).populate('images');

        return res.status(200).json({ message : "Images Retrieved", images : finalImages.images});
    }catch (e) {
        console.log(e);
        return res.status(500).json({ message : "Internal Server Error"})
    }


}

export { uploadImages, getEventImages }