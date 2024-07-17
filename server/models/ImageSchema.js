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
})

const ImageModel = model("images",ImageSchema)

export { ImageModel }