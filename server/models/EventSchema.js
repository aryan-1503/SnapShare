import mongoose, {model, Schema} from "mongoose";


const EventSchema = new Schema({
    eventName: {
        type: String,
        required : true
    },
    eventPhoto: {
        type: String,
        required: true
    },
    categories : [{
        type: String,
    }],
    description: {
        type: String
    },
    eventTime: {
        type :String,
        required: true
    },
    images: [{
        type: mongoose.Types.ObjectId,
        ref: "Image"
    }]
})

const eventModel = model("Event",EventSchema,"events")

export { eventModel }