import express from 'express'
import { verifyUser } from '../utils/verifyUser.js'
import { createListing } from '../controllers/Listing.controller.js'
const listingRouter = express.Router()
listingRouter.post( '/create' , verifyUser ,  createListing )
export default listingRouter