import express from "express";
import fileUpload from "../helper/multer";
import { getUsers, signup, updateUser, userLogin } from "../controllers/userController";

const userRoutes = express.Router();
userRoutes.post("/signup", fileUpload.single("profile"), signup);
userRoutes.post("/login", fileUpload.single("profile"), userLogin);
userRoutes.get("/selectUsers",fileUpload.single("profile"),getUsers)
userRoutes.put("/updateUser/:id",fileUpload.single("profile"),updateUser);
userRoutes.patch("/updateUser/:id",fileUpload.single("profile"),updateUser);

export default userRoutes