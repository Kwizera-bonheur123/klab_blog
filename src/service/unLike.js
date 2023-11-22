import { Like } from "../Model/likeModel";
import post from "../Model/postModel";
import { unLike } from "../Model/unLikeModel";

export const addUnLike = async (req,res) => {
    try{
        
    const {id} = req.params;
    const {autherId} = req.users._id;
    const checkPost = await post.findById(id);
    if(!checkPost){
        res.status(404).json({
            status: 404,
            message:"Post not found"
        })
    }
    const checkUnLike = await Like.findOne(autherId);
    // if(checkUnLike){
    //     const deleteLike = await Like.findByIdAndDelete(checkLike._id);
    //     res.status(200).json({
    //         status: 200,
    //         message:"unLike removed successfully",
    //     })
    // }
    const checkLike = await unLike.findOne(autherId);
    if(checkLike){
        const deleteUnLike = await unLike.findByIdAndDelete(checkLike._id);
        res.status(200).json({
            status: 200,
            message:"unLike removed successfully",
            data: deleteUnLike
        })
    } else {
        const addUnLike = await unLike.create({
            author: req.users._id,
            postId: id
        })
        const updatedpost = await post.findByIdAndUpdate(
            id,
            {
              $push: { unLikes: addUnLike._id },
            },
            { new: true }
          );
        res.status(200).json({
            status: 200,
            message:"unLike added successfully",
            data: addUnLike
        })
    }
    }
    catch (error) {
        res.status(500).json({
            status:500,
            message:"Fail to add or remove like",
            error:error.message
        })
    }
}


export const addLike = async (req,res) => {
    try{
        
    const {id} = req.params;
    const {autherId} = req.users._id;
    const checkPost = await post.findById(id);
    if(!checkPost){
        res.status(404).json({
            status: 404,
            message:"Post not found"
        })
    }
    const checkLike = await unLike.findOne(autherId);
    console.log(checkLike)
    if(checkLike){
        const deleteLike = await Like.findByIdAndDelete(checkLike._id);
        res.status(200).json({
            status: 200,
            message:"Like removed successfully",
            data: deleteLike
        })
    } else {
        const addLike = await Like.create({
            author: req.users._id,
            postId: id
        })
        res.status(200).json({
            status: 200,
            message:"Like added successfully",
            data: addLike
        })
    }
    }
    catch (error) {
        res.status(500).json({
            status:500,
            message:"Fail to add or remove like",
            error:error.message
        })
    }
}