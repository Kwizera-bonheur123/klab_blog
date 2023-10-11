import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    subheader:{
        type: String,
        require: true
    },
    content:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: false
    },
    authorP:{
        type: String,
        require: false
    },
    blogImage:{
        type: String,
        require: false
    }
});

const blog = mongoose.model("blogs",blogSchema);
export default blog
