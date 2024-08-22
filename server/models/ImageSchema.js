import {model, Schema} from "mongoose";

const ImageSchema = new Schema({
    imageUrl :{
        type: String,
        required: true
    },
    uploaderName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
})

const ImageModel = model("Image",ImageSchema,"images")

export { ImageModel }