import User from '../model/api.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/Error.js'

const auth = async (request , response , next ) =>{
    const {username , email , password } = request.body
    const hashedpassword = bcryptjs.hashSync(password , 10)
    const newUser = new User({username , password: hashedpassword , email})
    try{
        await newUser.save()
        response.json({message:"User added successfully!"})
    }
    catch(error){
      next(error)
    } 
}

export default auth