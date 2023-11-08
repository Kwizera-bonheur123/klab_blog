import users from "../Model/userModel";
import {uploadToCloud} from "../helper/cloud";
import { newUser } from "../service/User";
import { selectUsers } from "../service/User";
import { updateUsers } from "../service/User";
import { deleteU } from "../service/User";
import { userLogin } from "../service/User";

//create user
export const signup = async (req,res) => {
        const createdUser = newUser(req.body); 
        return res.status(200).json({
            status: "200",
            message:"User created successfully ",
            data: createdUser
        })
}
// user log in
export const Login = async (req, res) =>{
    try {

        const logedUser = await userLogin(req.body.email,req.body.password)
            return res.status(200).json({
                status:200,
                message:"You are logged in sucessfully",
                data:logedUser
            });
    } catch (error){
        return res.status(500).json({
            status: "500",
            message: "failed to login",
            error: error.message
        })
    }};
// select users

export const getUsers = async (req,res) =>{
        const getUsers = await selectUsers();
        return res.status(200).json({
            status: 200,
            message:"Data retrieved Successfully",
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
//delete user
export const deleteUser = async (req,res) => {
    try{
        const {id} = req.params
        const deleteB = await deleteU(id);
        return res.status(200).json({
            data : deleteB
        })

    }
    catch(error){
        return res.status(500).json({
            status : "failed",
            message : "Failed To deletee",
            error: error.message
        })
    }}