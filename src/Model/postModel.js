import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',
        required:true
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference the 'users' model for comment author
        required: true,
    },
});

export const Comment = mongoose.model('comments', commentSchema);


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
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference the 'users' model for comment author
        required: true,
    },
    blogImage:{
        type: String,
        require: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comments',
        },
    ]
});


const blog = mongoose.model("blogs",blogSchema);
export default blog
