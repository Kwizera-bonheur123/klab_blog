import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyPaser from "body-parser";
import bodyParser from "body-parser";
import morgan from "morgan";


// Routes

import blogRoutes from "./routes/blogRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
dotenv.config()

app.use(cors());
app.use(bodyPaser.json());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: false}));

// welcome to Api

app.use("/api/blog", blogRoutes)
app.use("/api/user", userRoutes)

app.use("/", (req,res)=>{
    res.status(200).json({
        status: "Success",
        author: "k.dot",
        message: "hello you are welcomed "
    })

})



export default app