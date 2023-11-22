import express  from "express";
import fileUpload from "../helper/multer";
import { addComment, createpost, deletepost, selectpost, selectById, updatepost, deleteComment } from "../controllers/postControllers";
import { likes } from "../controllers/postControllers";
import Authorization  from "../middleware/Aunthentication"
import userAunthentication from "../middleware/userAunthentication";
import { createPostValidation } from "../middleware/validation/createPostValidation";
import { commentValidation } from "../middleware/validation/commentValidation";

const postRoutes = express.Router();

postRoutes.post("/create",Authorization, fileUpload.single("postImage"),createPostValidation, createpost);
postRoutes.get("/select", selectpost);
postRoutes.get("/selectById/:id", selectById);
postRoutes.delete("/delete/:id",Authorization, deletepost);
postRoutes.put("/update/:id",Authorization,fileUpload.single("postImage"), updatepost );
postRoutes.post("/comment/:id",userAunthentication, fileUpload.single("postImage"),commentValidation, addComment);
postRoutes.post("/addLike/:id",userAunthentication, fileUpload.single("postImage"), likes);
postRoutes.delete("/deleteComment/:id",userAunthentication, fileUpload.single("postImage"), deleteComment);

export default postRoutes