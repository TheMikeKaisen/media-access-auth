import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const registerUser = asyncHandler( async (req, res) =>{
    
    // get user details from frontend
    const {username, email, fullname, password} = req.body

    // validation - not empty
    if(
        [username, email, fullname, password].some((field)=>field?.trim() === "")
    ){
        throw new ApiError(400, "All Fields are required")
    }

    // check if username or email already exists
    var userExists = User.findOne({
        $or: [{ username }, { email }]      // logical query operator.
    })
    if(userExists){
        throw new ApiError(409, "User with the username or email already exists!")
    }


    // check for images, check for avatar
    const avatarLocalPath = req.files?.Avatar[0]?.path
    const coverImageLocalPath = req.files?.CoverImage?.path

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required !")
    }


    // upload them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath)

    if(coverImageLocalPath){
        const coverImage = uploadOnCloudinary(coverImageLocalPath)
    }

    // create user object, create entry in db
    const user = await User.create({
        fullname, 
        avatar: avatar.url,
        coverImage: coverImage?.url || "",          // if coverImage exists, url is stored else empty string is stored
        email, 
        password, 
        username: username.toLowerCase()
    })

    // remove password and refresh token field from response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    // check for user creation
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering a user.")
    }


    // return res
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})


export {registerUser}