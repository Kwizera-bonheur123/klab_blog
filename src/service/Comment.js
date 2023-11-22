import { Comment } from "../Model/postModel";

export const removeComment = async (req,res) => {
    try{
        const {id} = req.params
        const checkId = await Comment.findById(id);
        if(!checkId){
            return  res.status(404).json({
                message:"Id Not Found!"
            })
        }
        const deleteC = await Comment.deleteMany({postId:id})
        const deleteB = await Comment.findByIdAndDelete(id);
        return res.status(200).json({
            status : "sucess",
            message : "data deleted successfully",
            data : deleteB
        })
    }
    catch(error){
        return res.status(500).json({
            status : "failed",
            message : "Failed To deletee",
            error: error.message
        })
    }}
