import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        unique:true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    avatar:{
         type: String,
         default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s"
    },
    password:{
        type:String,
        required: true,
    }
} , {timestamps:true})

const User = mongoose.model('User' , userSchema)
export default User