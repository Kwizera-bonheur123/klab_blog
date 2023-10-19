import post from "../Model/postModel";
import {uploadToCloud} from "../helper/cloud";
import { Comment } from "../Model/postModel";

// createpost

export const createpost = async (req,res) => {
    try{
        const {title,subheader,content,postImage} = req.body;
        // const {firstname, lastname, email, password, profile} = req.body;
        const existingTitle = await post.findOne({
            title: req.body.title,
        });
        if (existingTitle) {
            return res.status(500).json({
                status: "500",
                message: "Title already exist",
            });
        }
        let result;
        if(req.file) result = await uploadToCloud(req.file,res);

        const { lastname, profile } = req.users;
    
        const newpost = await post.create({
            title,
            subheader,
            content,
            postImage: result?.secure_url,
            author:req.users._id
        });
        return res.status(201).json({
            status: "201",
            message: "post Created Successfully",
            data: newpost
        })
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
      const getpost = await post.find().populate({path:'comments', populate:{path:'author',select:'first lastname profile email'}}).populate({path:'author', select: 'first lastname profile'});
      return res.status(200).json({
        status: "Success",
        message: "Data Retrieved Successfully",
        data: getpost,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Failed",
        message: "Failed To Select Data",
        error: error.message,
      });
    }
  };


export const selectComments=async(req,res )=> {
    try{
        const getpost = await comments.find();
        return res.status(200).json({
            status: "Sucess",
            message:"Data Retrieved Successfully",
            data:getpost
        })
    }
    catch(error){
        return res.status(500).json({
            status: "Failed",
            message: "Failed To Select Data",
            error : error.message
        })
    }

}

// delete
export const deletepost = async (req,res) => {
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

export const selectById = async (req,res) => {
    try{
        const {id} = req.params
        const checkId = await post.findById(id).populate({path:'comments', select: 'content author'});
        if(!checkId){
            return  res.status(404).json({
                message:"post Not Found!"
            })
        }
        return res.status(200).json({
            status : "sucess",
            message : "data retrieved successfully",
            data : checkId

        })

    }
    catch(error){
        return res.status(500).json({
            status : "failed",
            message : "Failed To retrieve post",
            error: error.message
        })

    }
}

// update 

export const updatepost = async(req,res) => {
    try{
        const {id} = req.params;
        const {title,subheader,content,postImage} = req.body;
        const checkId = await post.findById(id);
        if(!checkId){
            return res.status(404).json({
                message: "This post Not Found "
            })
        }
        let result;
        if(req.file) result = await uploadToCloud(req.file,res);
    
        const updateB = await post.findByIdAndUpdate(id,{
            title,
            subheader,
            content,
            postImage: result?.secure_url,

        });
        return res.status(200).json({
            status : "success",
            message : "well Data Updated!",
            data : updateB, 
        })
    }
    catch(error){
       return res.status(500).json({
        message : "Failed To update Info!",
        error : error.message,
       })
    }

}

export const addComment = async (req,res) =>{
    try {
        const { id } = req.params;
    
        // Create a new comment
        const newComment = await Comment.create({
          postId:id,
          content: req.body.content,
          author: req.users._id, // Assuming you have an authenticated user

        });
    
        // Find the corresponding post post
        const checkId = await post.findById(id);
        if(!checkId){
            return res.status(404).json({
                message: "This post Not Found "
            })
        }
    
        // Add the comment to the post's comments array
        const updatedpost = await post.findByIdAndUpdate(
          id,
          {
            $push: { comments: newComment._id },
          },
          { new: true }
        );
    
        res.status(201).json({
          message: "Comment added successfully.",
          comment: newComment,
        });
      } catch (error) {
        res.status(500).json({
          message: "Failed to add a comment.",
          error: error.message,
        });
}} 