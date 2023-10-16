import mongoose, { Schema } from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    subheader:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    authorP:{
        type: String,
        require: true
    },
    blogImage:{
        type: String,
        require: true
    },
    comments: []
});

const blog = mongoose.model("blogs",blogSchema);
export default blog
