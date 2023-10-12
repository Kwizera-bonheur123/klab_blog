import users from "../modules/userModel";
import {uploadToCloud} from "../helper/cloud";
import jwt from "jsonwebtoken";
import bcrypt, {gensalt, hash} from "bcrypt";
//create user

export const signup = async (req,res) => {
    try{
        const {firstname, lastname, email, password, profile} = req.body;
        const userEmail = await users.findOne({
            email: req.body.email,
        });
        if (userEmail) {
            return res.status(404).json({
                status: "500",
                message: "Email already exist",
            });
        }
        let result;
        if(req.file) result = await uploadToCloud(req.file,res);
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const newUser = await users.create({
            firstname,
            lastname,
            email,
            password: hashedPass,
            profile: result?.secure_url
        });
        return res.status(201).json({
            status: "201",
            message: "User Created Successfully",
            data: newUser
        })
    } catch (error) {
        return res.status(500).json({
            status: "500",
            message: "fail to Create user",
            error: error.message
        })
    }
}
// user log in

export const userLogin = async (req, res) =>{
    try {
        const userLogin = await users.findOne({
            email: req.body.email,
        });
        if (!userLogin) {
            return res.status(404).json({
                status: "404",
                message: "User Not Found",
            });
        }

        const isMatch = await bcrypt.compare(req.body.password, userLogin.password);
        if(!isMatch) {
            return res.status(404).json({
                status : "404",
                message: "password incorrect"
            });
        }
        const token = await jwt.sign(
            {id:userLogin._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.EXPIRE_DATE}
            );
            return res.status(200).json({
                status: "200",
                message: "logedin successfull",
                users: userLogin,
                token: token
            });
    } catch (error){
        return res.status(500).json({
            status: "500",
            message: "failed to login",
            error: error.message
        })
    }
};

// select users

export const getUsers = async (req,res) =>{
    try{
        const getUsers = await users.find();
        return res.status(200).json({
            status: "200",
            message: "data selected successfully",
            data: getUsers
        })
    }
    catch(error){
        return res.status(404).json({
            status: "404",
            message: "data not found",
            error: error.message
        })
    }
}


//  Update user

export const updateUser = async(req,res) => {
    try{
        const {id} = req.params;
        const {first,lastname,email,password,profile,role} = req.body;
        const checkId = await users.findById(id);
        if(!checkId){
            return res.status(404).json({
                message: "user not found"
            })
        }
        let result;
        if(req.file) result = await uploadToCloud(req.file,res);
        const updateU = await users.findByIdAndUpdate(id,{
            first,
            lastname,
            email,
            password,
            profile: result?.secure_url,
            role
        });
        return res.status(200).json({
            status:"success",
            message: "user updated successfully",
            data:updateU

        })
    }
    catch(error){
        return res.status(500).json({
            message:"failed to update user",
            error:error.message
        });

    }
}