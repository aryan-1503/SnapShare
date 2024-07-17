import mongoose, {model, Schema} from "mongoose";


const EventSchema = new Schema({
    email : {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required : true
    },
    eventPhoto: {
        type: String,
        data: Buffer
    },
    images: {
        type: mongoose.Types.ObjectId,
        ref: "images"
    }
})

const eventModel = model("Event",EventSchema,"events")

export { eventModel }