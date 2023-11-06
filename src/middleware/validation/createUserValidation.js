import Joi from "joi";
import users from "../../Model/userModel";

const userSchema = Joi.object({
    first: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });

export const createUserValidation = async(req, res, next) => {
    const { first, lastname, email, password } = req.body;

    const checkEmail = await users.findOne({email:email});
    if(checkEmail){
        return res.status(400).json({
            status:400,
            message:"Email Already exist try another"
        })
    }
  
    // Use Joi to validate the request body
    const { error } = userSchema.validate({ first, lastname, email, password });
  
    if (error) {
      return res.status(400).json({
        status: "400",
        message: error.details[0].message, // Get the first validation error message
      });
    }
  
    next(); // Data is valid, proceed to the next middleware
  };