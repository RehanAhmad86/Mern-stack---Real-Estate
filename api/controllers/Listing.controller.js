import Listing from "../model/Listing.model.js"
export const createListing = async ( request , response , next ) => {
    try{
        const createListing = await Listing.create(request.body)
        response.status(201).json(createListing)
    }
    catch(error){
        next(error)
    }
}