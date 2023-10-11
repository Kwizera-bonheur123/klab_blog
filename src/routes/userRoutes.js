import express from "express";
import fileUpload from "../helper/multer";
import { signup, userLogin } from "../controllers/userController";

const userRoutes = express.Router();
userRoutes.post("/signup", fileUpload.single("profile"), signup);
userRoutes.post("/login", fileUpload.single("profile"), userLogin);

export default userRoutes