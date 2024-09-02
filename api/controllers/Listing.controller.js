import Listing from "../model/Listing.model.js"
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
    if (request.user.id !== propertyListing.userRef) { return next(errorHandler(401, 'Delete your own Listing')) }
    try {
        await Listing.findByIdAndDelete(request.params.id)
        response.status(200).json('Listing has been deleted!')
    }
    catch (error) {
        next(error)

    }
}

export const updateListing = async (request, response, next) => {
    const updateListing = await Listing.findById(request.params.id)
    if (!updateListing) return next(errorHandler(404, ' Listing not found! '))
    // console.log(updateListing)
    if (request.user.id !== updateListing.userRef)
        return next(errorHandler(401, 'You can only update your own account! '))
    try {
        await Listing.findByIdAndUpdate(request.params.id, request.body, { new: true })
        response.status(200).json(' List has been Updated! ')
    } catch (error) {
        next(error)
    }
}

export const getListing = async (request, response, next) => {
    const findListing = await Listing.findById(request.params.id)
    if (!findListing) return next(errorHandler(404, 'No Listing found!'))
    try {
        response.status(200).json(findListing)
    }
    catch (error) {
        next(error)
    }
}


export const listings = async (request, response, next) => {
    try {
        let searchItem = request.query.searchItem || '';
        let limit = parseInt(request.query.limit) || 9
        let start = parseInt(request.query.startIndex) || 0
        let sort = request.query.sort || 'createdAt'
        let order = request.query.order || 'desc'

        let offer = request.query.offer
        if (offer === undefined || offer === 'false') {
            offer = { $in: [false, true] }
        }

        let furnished = request.query.furnished
        if (furnished === undefined || furnished === 'false') {
            furnished = { $in: [false , true] }
        }

        let parking = request.query.parking
        if (parking === undefined || parking === 'false') {
            parking = { $in: [false, true] }
        }

        let type = request.query.type
        if( type === undefined || type === 'all'){
            type = { $in: ['rent' , 'sale']}
        }

        const findListing = await Listing.find({
            name: { $regex: searchItem, $options: 'i' },
            type,
            offer,
            parking,
            furnished
        }).sort(
            {[sort]:order}
        ).limit(limit).skip(start);

        return response.status(200).json(findListing);
    } catch (error) {
        next(error);
    }
};
