import Listing from "../model/Listing.model.js"
import listingRouter from "../routes/Listing.route.js"
import { errorHandler } from "../utils/Error.js"
export const createListing = async (request, response, next) => {
    try {
        const createListing = await Listing.create(request.body)
        response.status(201).json(createListing)
    }
    catch (error) {
        next(error)
    }
}

export const deleteListing = async (request, response, next) => {
    const propertyListing = await Listing.findById(request.params.id)
   
    if (!propertyListing) return next(errorHandler(404, 'No listing found!'))
    if (request.user.id !== propertyListing.userRef) {return next(errorHandler(401, 'Delete your own Listing'))}
        try{
            await Listing.findByIdAndDelete(request.params.id)
            response.status(200).json('Listing has been deleted!')
    }
        catch(error){
            next(error)

        }
    }