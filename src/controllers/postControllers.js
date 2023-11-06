import post from "../Model/postModel";
import {uploadToCloud} from "../helper/cloud";
import { Comment } from "../Model/postModel";
import { newUser } from "../service/User";

// createpost

export const createpost = async (req,res) => {
    console.log(req.body.title);
    try{

        const cteatedUser = await newUser(req.body);

        return res.status(201).json({
                status: "201",
                message: "post Created Successfully",
                data: cteatedUser
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
        const getpost = await Comments.find();
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

        // Validate the 'id' parameter

        const {id} = req.params
        const checkId = await post.findById(id).populate({path:'comments', populate:{path:'author',select:'first lastname profile email'}}).populate({path:'author', select: 'first lastname profile'});
        
        if(!checkId){
            return  res.status(404).json({
                message:"post Not Found!"
            })
        }

        const addView = await post.findOneAndUpdate({_id:id},{
            $inc:{views:1}
        },
        )
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

        const {title,content,postImage} = req.body;
        const checkId = await post.findById(id);
        if(!checkId){
            return res.status(404).json({
                message: "This post Not Found "
            })
        }
        let result;
        if(req.file) result = await uploadToCloud(req.file,res);

        const checkTitle = await post.findOne({title:title});

        if(checkTitle){

        if(checkTitle._id != id){
            return res.status(404).json({
                message: "Title already exist please try other"
            })
        }
    }
        const updateB = await post.findByIdAndUpdate(id,{
            title,
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

        // Validate the 'id' parameter
        if (!id) {
            return res.status(400).json({
                status: "400",
                message: "Missing 'id' parameter in the request",
            });
        }
    
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



//DElete the comment

export const deleteComment = async (req,res) => {
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

    }
}
