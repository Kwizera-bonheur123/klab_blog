import Joi from "joi";

const userSchema = Joi.object({
    content: Joi.string().required(),
  });

  export const commentValidation = async (req, res, next) => {
    const { content } = req.body;

    const {error} = userSchema.validate({content});

    if(error){
        return res.status(404).json({
            status: 404,
            message: error.details[0].message
        })
    }

    next();
};
  