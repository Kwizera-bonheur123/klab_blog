import mongoose, { Schema } from "mongoose";

const likeSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference the 'users' model for comment author
        required: true,
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts', // Reference the 'users' model for comment author
        required: true,
    }
});

export const Like = mongoose.model('like', likeSchema);