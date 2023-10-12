import express  from "express";
import fileUpload from "../helper/multer";
import { createBlog, deleteBlog, selectBlog, updateBlog } from "../controllers/blogControllers";
import Authorization  from "../middleware/Aunthentication"

const blogRoutes = express.Router();

blogRoutes.post("/create",Authorization, fileUpload.single("blogImage"), createBlog);
blogRoutes.get("/select", selectBlog);
blogRoutes.delete("/delete/:id", deleteBlog);
blogRoutes.put("/update/:id",fileUpload.single("blogImage"), updateBlog );

export default blogRoutes