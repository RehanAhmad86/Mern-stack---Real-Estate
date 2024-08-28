import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { createListing , deleteListing } from '../controllers/Listing.controller.js'
const listingRouter = express.Router()
listingRouter.post( '/create' , verifyUser ,  createListing )
listingRouter.delete( '/delete/:id' , verifyUser ,  deleteListing )
export default listingRouter
