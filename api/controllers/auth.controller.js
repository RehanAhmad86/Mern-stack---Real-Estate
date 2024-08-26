import User from "../model/api.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/Error.js";
import jwt from 'jsonwebtoken'

export const signup = async (request, response, next) => {
  const { username, email, password } = request.body;
  const hashedpassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, password: hashedpassword, email });
  try {
    await newUser.save();
    response.json({ message: "User added successfully!" });
  } catch (error) {
    next(error);
  }
};
 export const signin = async (request, response, next) => {
  const {email , password} = request.body
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials!"));
    const { password:pass , ...rest } = validUser._doc
    const token = jwt.sign({id: validUser._id} , process.env.JWT_SECRET);
    response.cookie( 'access_token' , token , {httpOnly:true} ).status(200).json(rest)
  } catch (error) {
    next(error);
  }
};

export const google =  async ( request , response , next ) => {
  try{
  const user = await User.findOne({email: request.body.email})
  if(user){
    const token = jwt.sign({id: user._id} , process.env.JWT_SECRET)
    const { password: pass , ...rest} = user._doc
    response.cookie( 'access_token' , token , {httpOnly: true})
    .status(200)
    .json(rest)
  }else{
    const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8)
    const hashedpassword = bcryptjs.hashSync( generatePassword , 10)
    const username = request.body.name.split(" ").join("").toLowerCase() + 
    Math.random().toString(36).slice(-4);
    
    
    const newUser = new User({ username , email: request.body.email , password: hashedpassword , avatar:request.body.photo})
      await newUser.save()
      const token = jwt.sign({id: newUser._id} , process.env.JWT_SECRET)
      const { password: pass , ...rest} = newUser._doc
      response.cookie('access_token' , token , {httpOnly: true})
      .status(200)
      .json(rest)
  }}
  catch(error){
    next(error)
  }

} 


export const signOut =  async ( request , response , next ) => {
  try{
    response.clearCookie('access_token')
    response.status(200).json("User has been logged out!")
  }
  catch(error){
    next(error)
  }
}