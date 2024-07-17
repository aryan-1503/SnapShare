import mongoose, { model, Schema } from "mongoose";

const UserSchema = new Schema({
    email : {
        type: String,
        required: true
    }
})


const UserModel = model("User",UserSchema,"users");

export { UserModel };