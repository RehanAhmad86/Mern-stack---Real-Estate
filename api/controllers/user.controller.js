import bcryptjs from "bcryptjs"
import User from "../model/api.model.js"
import { errorHandler } from "../utils/Error.js"
import Listings from '../model/Listing.model.js'

const test = (request, response) => {
    response.json(
        { message: "data is sent!" }
    )
}

export const updateUser = async (request, response, next) => {
    if (request.user.id !== request.params.id) return next(errorHandler(401, 'Update your own account'))
        
    try {
        if (request.body.password) {
            request.body.password = bcryptjs.hashSync(request.body.password, 10)
        }
        const updatedUser = await User.findByIdAndUpdate(request.params.id, {
            $set: {
                username: request.body.username,
                password: request.body.password,
                email: request.body.email,
                avatar: request.body.avatar
            }
        }, { new: true })
        const { password, ...rest } = updatedUser._doc
        response.json(rest)
    }
    catch (error) {
        next(error)
    }
}

export const deleteUser = async (request, response, next) => {
    if (request.user.id !== request.params.id) return next(errorHandler(401, 'Delete your own account!'))
    try {
        await User.findByIdAndDelete(request.params.id)
        response.clearCookie('access_token')
        response.status(200).json("User has been deleted successfully!")
    }
    catch (error) {
        next(error)
    }
}

export const getUserListings = async (request, response, next) => {
    if (request.user.id === request.params.id) {
        try {
            const getListings = await Listings.find({ userRef: request.params.id })
            response.status(200).json(getListings)
        }
        catch (error) {
            next(error)
        }
    }
    else {
        return next(errorHandler(401, 'You can only view your listings.'))
    }
}

export const getUser = async (request, response, next) => {
    try {
        const getuser = await User.findById(request.params.id)
        if (!getuser) return next(errorHandler(404, 'User not found!'))
        const { password : pass , ... rest } = getuser._doc
        response.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}


export default test

