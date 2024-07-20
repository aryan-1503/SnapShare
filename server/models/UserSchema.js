import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    events: [{
        type: mongoose.Types.ObjectId,
        ref: 'Event'
    }],
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode: {
        type: String,
    },
    attempts: {
        type: Number,
        default: 0
    }
})

UserSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});



const UserModel = model("User",UserSchema,"users");

export { UserModel };