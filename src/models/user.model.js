import mongoose, {Schema} from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema({
    username:{
        type: String, 
        required: true, 
        unique: true,
        lowercase: true, 
        trim: true, 
        index: true     // used for optimized searching
    },
    email:{
        type: String, 
        required: true, 
        unique: true,
        lowercase: true, 
        trim: true, 
    },
    fullname:{
        type: String, 
        required: true,
        trim: true,
        index: true 
    },
    avatar:{
        type: String,       // cloudinary url
        required: true
    },
    coverimage:{
        type: String,       // cloudinary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    refreshToken: {
        type: String
    }


}, {timestamps: true})

// encripting the password
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// password verification 
userSchema.methods.isPasswordCorrect = async function(password){        // custom method
    return await bcrypt.compare(password, this.password)
}

// generating access token
userSchema.methods.generateAccessToken = function(){
    jwt.sign({
        _id: this._id, 
        username: this.username, 
        fullname: this.fullname, 
        email: this.email
    }, process.env.ACCESS_TOKEN_SECRET, 
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

// generating refresh token
userSchema.methods.generateRefreshToken = function(){
    jwt.sign({
        _id: this._id, 
    }, process.env.REFRESH_TOKEN_SECRET, 
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}



export const User = mongoose.model("User", userSchema)