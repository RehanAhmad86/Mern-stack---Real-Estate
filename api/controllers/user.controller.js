import bcryptjs from "bcryptjs"
import User from "../model/api.model.js"
import { errorHandler } from "../utils/Error.js"

const test = (request, response) => {
    response.json(
        { message: "data is sent!" }
    )
}


export const updateUser = async (request, response, next) => {
    if (request.user.id !== request.params.id) return next(errorHandler(401, 'Upadte your own account'))

    try {
        if (request.body.password) {
            request.body.password = await bcryptjs.hashSync(request.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(request.params.id, {
            $set: {
                username: request.body.username,
                password: request.body.password,
                email: request.body.email,
                avatar: request.body.avatar
            }
    },{new:true})
    const { password , ...rest} = updatedUser._doc
    response.json(rest)
    }
    catch (error) {
        next(error)
    }
}





export default test

