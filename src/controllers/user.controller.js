import {asyncHandler} from "../utils/asyncHandler.js"
import {apiError} from "../utils/apiError.js"
import  {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js"

const registerUser=asyncHandler(async(req,res)=>{
   // get user details from frontend
   // validation- not empty
   //check if user already exist : email,password
   // check for images and avatar
   // upload them to cloudinary
   // create user object - create entry in db
   //remove password and refresh tokens fields from response
   // check for user creation
   // return response
   const {fullname,email,password,username}=req.body
   if(
    [fullname,email,username,password].some((field)=>
    field?.trim()==="")
){
    throw new apiError(400,"All fields are required");
}

const existedUser= await User.findOne({
    $or:[{email},{username}]
})

if(existedUser){
    throw new apiError(404,"User with email or username already exists")
}

const avatarLocalPath=req.files?.avatar[0].path;
// const coverImageLocalPath=req.files?.coverImage[0].path;

if(!avatarLocalPath){
    throw new apiError(400,"avatar file is required");

}
 

  let coverImageLocalPath;
if(req.files && Array.isArray(req.files.coverImage)&& req.files.coverImage.length >0){
    coverImageLocalPath=req.files.coverImage[0].path
}

const avatar= await uploadOnCloudinary(avatarLocalPath);
const coverImage= await uploadOnCloudinary(coverImageLocalPath)
 
if(!avatar){
    throw new apiError(400,"avatar file is required");
}
const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:username.toLowerCase()
})

const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
)
if(!createdUser){
    throw new apiError(500,"Something went wrong while registering the user")
}

return res.status(201).json(
  new apiResponse(200,createdUser,"User registered successfully")
)


})

export {registerUser}