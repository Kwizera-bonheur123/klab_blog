import post from "../../Model/postModel";
import Joi from "joi";
import users from "../../Model/userModel";

const userSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

export const createPostValidation = async (req, res, next) => {

    console.log(req.body);

    const { title, content, postImage } = req.body;

    // Check if a post with the same title already exists in the database
    const existingTitle = await post.findOne({ title: title });

    if (existingTitle) {
        return res.status(400).json({
            status: "400",
            message: "Title already exists",
        });
    }

    const {error} = userSchema.validate({title, content});

    if(error){
        return res.status(404).json({
            status: 404,
            message: error.details[0].message
        })
    }

    next();
};
  