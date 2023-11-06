import users from "../Model/userModel";
import {uploadToCloud} from "../helper/cloud";
import jwt from "jsonwebtoken";
import bcrypt, {gensalt, hash} from "bcrypt";
import { newUser } from "../service/User";
import { selectUsers } from "../service/User";
import { updateUsers } from "../service/User";
import { deleteU } from "../service/User";


//create user

export const signup = async (req,res) => {
        const createdUser = newUser(req.body); 
}
// user log in

export const userLogin = async (req, res) =>{
    try {
// Validate the request body of forms
if ( !req.body.email || !req.body.password) {
    return res.status(400).json({
        status: "400",
        message: "Missing required fields in the request body please provide inputs",
    });
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!req.body.email.match(emailRegex)) {
    return res.status(400).json({
        status: "400",
        message: "Invalid email format",
    });
}
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
        const getUsers = await selectUsers();
        return res.status(200).json({
            data: getUsers
        })
}


//  Update user

export const updateUser = async(req,res) => {
        const {id} = req.params;
        const {first,lastname,email,password,profile,role} = req.body;
        const file = res.file;
        const updateU = await updateUsers(id,req.body,file);
        return res.status(200).json({
            data:updateU
        })
}

export const deleteUser = async (req,res) => {
        const {id} = req.params
        const deleteB = await deleteU(id);
        return res.status(200).json({
            data : deleteB
        })
}