import { uploadToCloud } from "../helper/cloud";
import bcrypt from 'bcrypt';
import users from "../Model/userModel";
import jwt from "jsonwebtoken";
import {gensalt, hash} from "bcrypt";

export const newUser = async (userData) => {
        try{

            const createdUser = await users.create(userData);
            return {status: 201, message: "User created successfully kiriyate", data: createdUser};
        } catch (error) {
            return {status: 500, message: "Data does not added",error:error.message}
        }
}

export const selectUsers = async () => {
    try {

        const selectedUsers = await users.find();
       return {status: 200, message: "Data retrieved successfully", data: selectedUsers}

    } catch (error) {

        return {status: 500, message:"Data not retrieved", error:error.message}
    }

}
//Update user
export const updateUsers = async(id, userData,file) =>{
    try {

        const {first,lastname,email,password,profile,role} = userData;

        const checkId = await users.findById(id);
        if(!checkId){
            return { status: 404, message: 'User not found' };
        }

        const checkEmail = await users.findOne({email:userData.email});
        if(checkEmail){
            if(checkEmail._id._id != id){
                return { status: 404, message: 'Email Already Exist' };
            }
        }

        let result;
        if(file) result = await uploadToCloud(req.file,res);

        if(password){ 
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, salt);
       
    
    const updateU = await users.findByIdAndUpdate(id,{
        first,
        lastname,
        email,
        password: hashedPass,
        profile: result?.secure_url,
        role
    });

    return { status: 201, message: 'user updated successfully',data:updateU };
        } else {
            const updateU = await users.findByIdAndUpdate(id,{
                first,
                lastname,
                email,
                profile: result?.secure_url,
                role
            });
            return { status: 200, message: 'user updated successfully',data:updateU };
        }

    } catch(error){
        return {status: 500,message:"User not updated", error:error.message};
    }
}

//Delete user

export const deleteU =async (id) => {
    try{

        const checkId = await users.findById(id);
        if(!checkId){
            return {status: 404, message: "User not found"}
        }
        const deleteUser = await users.findByIdAndDelete(id);
        return {status: 200,message:"Data deleted successfully",data:deleteUser}
    } catch (error) {
        return {status: 200,message:"Data deleted successfully",error:error.message}
    }
}

export const userLogin = async (email,password) =>{
    try {
        
        const userLogin = await users.findOne({
            email: email
        });
        if (!userLogin) {
            return {status: 404, message: "User Not Found"}
        }

        const isMatch = bcrypt.compare(password, userLogin.password);
        if(!isMatch) {
            console.log("Incorect password");
            return {status: 401,message:"Incorect Password"}
        }
        const token = jwt.sign(
            {id:userLogin._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.EXPIRE_DATE}
            );
            return { data:userLogin,token:token}
    } catch (error){
        return {status:500,message:"Login Failed",error:error.message}
    }
};