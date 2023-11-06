import post from "../../Model/postModel";

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

    if (!title || content) {
        return res.status(400).json({
            status: "400",
            message: "Missing required fields in the request body",
        });
    }
    
    req.validatedData = { title, content };
    next();
};

export const createUserValidation = async (req, res, next) => {

    const {first, lastname, email, password, profile} = req.body;
    console.log(req.body);

    // Validate the request body
    if (!first || !lastname || !email || !password) {
        return res.status(400).json({
            status: "400",
            message: "Missing required fields in the request body please provide inputs",
        });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailRegex)) {
        return res.status(400).json({
            status: "400",
            message: "Invalid email format",
        });
    }
    if (password.length < 8) {
        return res.status(400).json({
            status: "400",
            message: "Password must be at least 8 characters long",
        });
    }
    next();
};


