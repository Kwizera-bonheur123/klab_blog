import mongoose, { Schema } from "mongoose";

const unLikeSchema = new mongoose.Schema({
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

export const unLike = mongoose.model('unLike', unLikeSchema);