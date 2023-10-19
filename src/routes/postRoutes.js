import express  from "express";
import fileUpload from "../helper/multer";
import { addComment, createpost, deletepost, selectpost, selectById, updatepost } from "../controllers/postControllers";
import Authorization  from "../middleware/Aunthentication"
import userAunthentication from "../middleware/userAunthentication";

const postRoutes = express.Router();

postRoutes.post("/create",Authorization, fileUpload.single("postImage"), createpost);
postRoutes.get("/select", selectpost);
postRoutes.get("/selectById/:id", selectById);
postRoutes.delete("/delete/:id",Authorization, deletepost);
postRoutes.put("/update/:id",Authorization,fileUpload.single("postImage"), updatepost );
postRoutes.post("/comment/:id",userAunthentication, fileUpload.single("postImage"), addComment);
// postRoutes.get("/getComment/:id", getComments);

export default postRoutes