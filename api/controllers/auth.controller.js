import User from '../model/api.model.js'
import bcryptjs from 'bcryptjs'

const auth = async (request , response ) =>{
    const {username , email , password } = request.body
    const hashedpassword = bcryptjs.hashSync(password , 10)
    const newUser = new User({username , password: hashedpassword , email})
    try{
        await newUser.save()
        response.json({message:"User added successfully!"})
    }
    catch(error){
   response.status(500).json(error.message)
    }
    
}

export default auth