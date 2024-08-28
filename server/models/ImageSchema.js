import {model, Schema} from "mongoose";

const ImageSchema = new Schema({
    image : {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    uploaderName: {
        type: String,
        required: true
    },
    category: {
        type: String,
    }
})

const ImageModel = model("Image",ImageSchema,"images")

export { ImageModel }