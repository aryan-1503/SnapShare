import express, {urlencoded} from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"
import { connectToDB } from "./utils/connectToDb.js";
import { authRouter } from "./routes/auth.route.js";
import { newEventRoute } from "./routes/new-event.route.js";
import { userRoute } from "./routes/user.route.js";


const PORT = process.env.PORT || 8000
console.log("SnapShare backend")
const app = express()
await connectToDB();

app.use(cors({
    origin: ['http://localhost:5173','https://snap-share-xi.vercel.app'],
    credentials: true,
}))

app.use(express.json());
app.use(urlencoded({ extended:true }))
app.use(cookieParser(process.env.SECRET,{
    httpOnly: true,
    secure: true,
    sameSite: "None"
}));
app.use('/events', express.static('events'));

//Routers

app.use("/api/auth",authRouter)
app.use("/api/new-event/",newEventRoute)
app.use("/api/user",userRoute)

app.get("/", (req, res) => {
    res.send("HealthCheck");
});


app.listen(PORT, () => {
    console.log("Server running on : http://localhost:5555/");
});






