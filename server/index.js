import express from "express";
import mongoose from "mongoose";
import cors from "cors"
import { UserModel } from "./models/UserSchema.js";
import "dotenv/config"
import {connectToDB} from "./utils/connectToDb.js";

const PORT = process.env.PORT || 8000

const app = express()
connectToDB();

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
});


app.post("/user",async (req,res) => {
    const { email } = req.body;
    try {
        console.log("Starting");
        const ifUserExists =  await UserModel.find({ email });
        
        if(ifUserExists.length > 0){
            return res.status(200).send(ifUserExists);
        }

        const newUser = new UserModel({ email })

        const savedUser = await newUser.save();
        return res.status(200).send({message: "Success", user: savedUser});

    } catch (error) {
        console.log(error);
        return res.status(400).send({ message: "failed", error : error});
    }
})

app.listen(PORT, () => {
    console.log("Server running on : http://localhost:5555");
});






