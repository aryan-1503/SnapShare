import express, {urlencoded} from "express";
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"
import {connectToDB} from "./utils/connectToDb.js";
import {authRouter} from "./routes/auth.route.js";

const PORT = process.env.PORT || 8000
console.log("SnapShare backend")
const app = express()
await connectToDB();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(express.json());
app.use(urlencoded({ extended:false }))
app.use(cookieParser());

//Routers

app.use("/api/auth",authRouter)

app.get("/", (req, res) => {
    res.send("Hello world");
});


app.listen(PORT, () => {
    console.log("Server running on : http://localhost:5555/");
});






