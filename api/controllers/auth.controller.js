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
    const token = jwt.sign({id: validUser._id} , process.env.JWT_SECRET);
    const { password:pass , ...rest } = validUser._doc
    response.cookie( 'access' , token , {httpOnly:true} ).status(200).json(rest)
  } catch (error) {
    next(error);
  }
};

