import express from "express";
import fileUpload from "../helper/multer";
import { getUsers, signup, updateUser, userLogin, deleteUser } from "../controllers/userController";
import Authorization  from "../middleware/Aunthentication"
import { createUserValidation } from "../middleware/validation/createUserValidation";

const userRoutes = express.Router();
userRoutes.post("/signup",fileUpload.single("profile"), createUserValidation,  signup);
userRoutes.post("/login", fileUpload.single("profile"), userLogin);
userRoutes.get("/selectUsers",Authorization,fileUpload.single("profile"),getUsers)
userRoutes.put("/updateUser/:id",Authorization,fileUpload.single("profile"),updateUser);
userRoutes.delete("/deleteUser/:id",Authorization,fileUpload.single("profile"),deleteUser);

export default userRoutes