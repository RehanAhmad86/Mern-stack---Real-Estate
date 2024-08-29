import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { createListing , deleteListing , updateListing } from '../controllers/Listing.controller.js'
const listingRouter = express.Router()
listingRouter.post( '/create' , verifyUser ,  createListing )
listingRouter.delete( '/delete/:id' , verifyUser ,  deleteListing )
listingRouter.post( '/update/:id' , verifyUser ,  updateListing )
export default listingRouter
