import post from "../Model/postModel";
import {uploadToCloud} from "../helper/cloud";
import { Comment } from "../Model/postModel";

export const newPost = async (req,res) => {
    try{
        const {title,content,postImage} = req.body;
        let result;
        if(req.file) result = await uploadToCloud(req.file);
        const newpost = await post.create({
            title,
            content,
            postImage: result?.secure_url,
            author:req.users._id
        });
        return res.status(201).json({
            status: "201",
            message: "post Created Successfully yatee",
            data: newpost
        })
    } catch (error) {
        return {status:404,message:"Fail to add post",error:error.message}
    }
}

export const getPost = async(req,res) => {
    try {
        const getpost = await post.find().populate({path:'comments', populate:{path:'author',select:'first lastname profile email'}}).populate({path:'author', select: 'first lastname profile'});
        return res.status(200).json({status: "Success",message: "Data Retrieved Successfully",posts: getpost});
      } catch (error) {
        return res.status(500).json({
          status: "Failed",
          message: "Failed To Select Data",
          error: error.message
        });
      }
}

export const getPostById = async ({id}) => {
    try{
        const checkId = await post.findById(id).populate({path:'comments', populate:{path:'author',select:'first lastname profile email'}}).populate({path:'author', select: 'first lastname profile'});
        if(!checkId){
            return  {message:"post Not Found!"}
        }

        const addView = await post.findOneAndUpdate({_id:id},{
            $inc:{views:1}
        },
        )
        return {status : "sucess",message : "data retrieved successfully",data : checkId}}
    catch(error){
        return {status : "failed",message : "Failed To retrieve post",error: error.message}}}
       

        export const changePost = async(req) => {
            try{
                const {id} = req.params;
        
                const {title,content,postImage} = req.body;
                const checkId = await post.findById(id);
                if(!checkId){
                    return { message: "This post Not Found "}
                }
                let result;
                if(req.file) result = await uploadToCloud(req.file);
        
                const checkTitle = await post.findOne({title:title});
        
                if(checkTitle){
        
                if(checkTitle._id != id){
                    return { message: "Title already exist please try other"}
                }
            }
                const updateB = await post.findByIdAndUpdate(id,{
                    title,
                    content,
                    postImage: result?.secure_url,
        
                });
                return {status : "success",message : "well Data Updated!",data : updateB}
            }
            catch(error){
               return {message : "Failed To update Info!",error : error.message}
            }}

            export const postComment = async (req,res) =>{
                try {
                    const { id } = req.params;
            
                     // Find the corresponding post post
                     const checkId = await post.findById(id);
                     if(!checkId){
                         return res.status(404).json({
                             message: "This post Not Found "
                         })
                     }
            
                    // Create a new comment
                    const newComment = await Comment.create({
                      postId:id,
                      content: req.body.content,
                      author: req.users._id, // Assuming you have an authenticated user
            
                    });       
                
                    // Add the comment to the post's comments array
                    const updatedpost = await post.findByIdAndUpdate(
                      id,
                      {
                        $push: { comments: newComment._id },
                      },
                      { new: true }
                    );
                
                    res.status(201).json({
                        status:200,
                      message: "Comment added successfully.",
                      comment: newComment
                    });
                  } catch (error) {
                    res.status(500).json({
                      message: "Failed to add a comment.",
                      error: error.message,
                    });
            }} 
            export const removePost = async (req,res) => {
                try{
                    const {id} = req.params
            
                    const checkId = await post.findById(id);
                    if(!checkId){
                        return  res.status(404).json({
                            message:"Id Not Found!"
                        })
                    }
                    const deleteC = await Comment.deleteMany({postId:id})
                    const deleteB = await post.findByIdAndDelete(id);
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
            
                }
            }