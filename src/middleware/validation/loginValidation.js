import Joi from "joi";

const userSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  export const loginValidation = async (req, res, next) => {
    const { email,password } = req.body;

    const {error} = userSchema.validate({email,password});

    if(error){
        return res.status(404).json({
            status: 404,
            message: error.details[0].message
        })
    }

    next();
};
  