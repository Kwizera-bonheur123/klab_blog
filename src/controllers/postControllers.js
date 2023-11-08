import { getPostById, newPost, getPost, changePost, postComment,removePost } from "../service/post";
import { removeComment } from "../service/Comment";

// createpost
export const createpost = async (req,res) => {
    try{
        const cteatedUser = await newPost(req,res);
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "fail to Create user",
            error: error.message
        })
    }
}

// select a post

export const selectpost = async (req, res) => {
    try {
      const getpost = await getPost(req,res);
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "Failed To Select Data",
        error: error.message,
      });
}};
 
// delete
export const deletepost = async (req,res) => {
    try{
        const deleteP = await removePost(req,res);
    }
    catch(error){
        return res.status(500).json({
            status : "failed",
            message : "Failed To deletee",
            error: error.message
        })

    }
}
//select post by add
export const selectById = async (req,res) => {
    try{
        const checkId = await getPostById(req.params)
        return res.status(200).json({post : checkId})
    }
    catch(error){
        return res.status(500).json({
            status : "failed",
            message : "Failed To retrieve post",
            error: error.message
        })
    }}

// update 

export const updatepost = async(req,res) => {
    try{
        const updateP = await changePost(req);
        return res.status(200).json({updatedPost : updateP})
} catch (error){
    return {status:500,message:"Fail to update data",error:error.message}
}}

export const addComment = async (req,res) =>{
    try {
         const newComment = await postComment(req,res);
      } catch (error) {
        res.status(500).json({
          message: "Failed to add a comment",
          error: error.message,
        });
}} 

//DElete the comment
export const deleteComment = async (req,res) => {
    try{
        const checkId = await removeComment(req,res);
    }
    catch(error){
        return res.status(500).json({
            status : "failed",
            message : "Failed To deletee",
            error: error.message
        })
    }}
