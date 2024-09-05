import {UserModel} from "../models/UserSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"
import nodemailer from "nodemailer"
import {getUser} from "../utils/getUser.js";
import axios from "axios";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    secureConnection : false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    tls : {
        rejectUnauthorized :true
    }
});

const login = async (req,res) => {
    const { email, password } = req.body;
    try{
        const user = await UserModel.findOne({ email });
        if (!user.isVerified){
            await axios.delete(`https://snapshare-avzz.onrender.com/api/auth/delete-user/${email}`)
            return res.status(401).json({ message: "Email not verified!" })
        }
        if(!user){
            console.log("user not found")
            return res.status(404).json({ message: "User not found! Register first" });
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);
        if (!isPasswordMatch){
            console.log("password incorrect")
            return res.status(400).json({ message: "Password incorrect" });
        }
        const token = jwt.sign({id: user._id}, process.env.SECRET, { expiresIn: '30d' });
        res.cookie('token', token,{
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        return res.status(200).json({message: "Login Successfully",token})
    }catch (error) {
        console.log(error)
        return res.status(500).json({ message : error})
    }
}

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try{
        const userExists = await UserModel.findOne({ email });
        if (userExists){
            return res.status(400).json({message: "User Already Exists"})
        }
        const verificationCode = Math.floor(1000 + Math.random() * 9000).toString();
        const newUser = new UserModel({ username,email,password,verificationCode});
        const savedUser = await newUser.save();

        const mailOptions = {
            from: process.env.MAIL_USER,
            to: email,
            subject: `SnapShare Email Verification Code`,
            text: `Welcome to SnapShare! 🌟 Verify your email to unlock the full potential of sharing your moments with the world. Your SnapShare verification code is: ${verificationCode}. Enjoy the journey! 📸✨`,
        };

        await transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).send({message: error})
            } else {
                res.status(200).send({message: info.response})
            }
        });
        return res.status(200).json({ message: "Verify your email", savedUser });
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ message : "Something went wrong",error})
    }
}

const logout = (req,res) => {
    res.clearCookie('token',{
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
    res.status(200).json({ message: "Logout Successfully"});
}

const verify = async (req, res) => {
    const {email,verificationCode} = req.body;
    try{
        const user = await UserModel.findOne({ email });
        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if(user.verificationCode === verificationCode){
            user.isVerified = true;
            user.verificationCode = "";
            user.attempts = 0;
            const savedUser = await user.save();
            const token = jwt.sign({id: user._id},process.env.SECRET, {expiresIn: '1d'});
            res.cookie('token',token,{
                httpOnly: true,
                secure: true,
                sameSite: "none",
            })
            return res.status(200).json({ message: "Registration done successfully",user: savedUser});
        }
        else{
            user.attempts += 1;
            await user.save();

            if(user.attempts >= 3){
                await UserModel.deleteOne({ email });
                return res.status(401).json({ message: "Verification Failed"});
            }
            else{
                return res.status(401).json({message: "Try Again"})
            }
        }
    }catch (error) {
        console.log(error)
        return res.status(500).json({message: "Something went Wrong"});
    }
}

const me = async (req, res) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(200).json({ msg: "Token not Present" });
    }
    const data = await jwt.verify(token, process.env.SECRET,{
        httpOnly: true,
        secure: true,
        sameSite: "None"
    });

    if (!data) {
        return res.status(401).json({ msg: "data Unauthorized" });
    }
    const id = data.id
    const user = await UserModel.findById(id).select("-password");
    res.status(200).json({ user });
}

const deleteUser = async (req,res) => {
    const { email } = req.body;
    try{
        await UserModel.findOneAndDelete({ email });
        res.status(201).json({ message: "Retry again!" })
    }catch (e) {

    }
}


export { login, register, logout, verify, me, deleteUser }