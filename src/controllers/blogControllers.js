import blog from "../modules/blogModules";
import {uploadToCloud} from "../helper/cloud";
import { uuid } from 'uuidv4';
// createBlog

export const createBlog = async (req,res) => {
    try{
        const {title,subheader,content,blogImage} = req.body;
        // const {firstname, lastname, email, password, profile} = req.body;
        const existingTitle = await blog.findOne({
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
    
        const newBlog = await blog.create({
            title,
            subheader,
            content,
            blogImage: result?.secure_url,
            author:req.users.lastname,
            authorP: req.users.profile
        });
        return res.status(201).json({
            status: "201",
            message: "Blog Created Successfully",
            data: newBlog
        })
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "fail to Create user",
            error: error.message
        })
    }
}

// select a blog

export const selectBlog=async(req,res )=> {
    try{
        const getBlog = await blog.find();
        return res.status(200).json({
            status: "Sucess",
            message:"Data Retrieved Successfully",
            data:getBlog
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
export const deleteBlog = async (req,res) => {
    try{
        const {id} = req.params
        const checkId = await blog.findById(id);
        if(!checkId){
            return  res.status(404).json({
                message:"Id Not Found!"
            })
        }
        const deleteB = await blog.findByIdAndDelete(id);
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

// update 

export const updateBlog = async(req,res) => {
    try{
        const {id} = req.params;
        const {title,subheader,content,blogImage} = req.body;
        const checkId = await blog.findById(id);
        if(!checkId){
            return res.status(404).json({
                message: "This blog Not Found "
            })
        }
        let result;
        if(req.file) result = await uploadToCloud(req.file,res);
    
        const updateB = await blog.findByIdAndUpdate(id,{
            title,
            subheader,
            content,
            blogImage: result?.secure_url,

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


export const addComment = async (req, res) => {
    try {
      const { id } = req.params;
      const {content} = req.body;

      console.log(uuid())
      
      const checkId = await blog.findById(id);

      if(!checkId){
        return res.status(404).json({
            message: "This blog Not Found "
        })
    }

    if(req.file) result = await uploadToCloud(req.file,res);
  
      // Find the blog by ID and add the comment
      const newBlog = await blog.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            comments: { id: uuid(),
                content,
                author:req.users.lastname,
                authorP: req.users.profile  },
          },
        },
        { new: true }
      );
  
      return res.status(201).json({
        status: "201",
        message: "Comment added successfully",
        data: newBlog.comments.reverse(),
      });
    } catch (error) {
      return res.status(500).json({
        status: "500",
        message: "Failed to add a comment",
        error: error.message,
      });
    }
  };
  