import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
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


const postSchema = new mongoose.Schema({
    title:{
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
    postImage:{
        type: String,
        require: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'comments',
        },
    ],
    likes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'like'
        }
    ],
    views:{
        type: Number,
        default: 0
    }
});


const post = mongoose.model("posts",postSchema);
export default post
