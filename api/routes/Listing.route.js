import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { createListing , deleteListing , updateListing , getListing , listings } from '../controllers/Listing.controller.js'
const listingRouter = express.Router()
listingRouter.post( '/create' , verifyUser ,  createListing )
listingRouter.delete( '/delete/:id' , verifyUser ,  deleteListing )
listingRouter.post( '/update/:id' , verifyUser ,  updateListing )
listingRouter.get( '/get/:id' ,  getListing )
listingRouter.get( '/get' ,  listings )
export default listingRouter
