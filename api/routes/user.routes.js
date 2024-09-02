import express, { request, response } from 'express'
const userRouter = express.Router()
import test from '../controllers/user.controller.js'
import { updateUser , deleteUser , getUserListings , getUser} from '../controllers/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

userRouter.get( '/test' , test)
userRouter.put( '/update/:id' , verifyUser , updateUser )
userRouter.delete( '/delete/:id' , verifyUser , deleteUser )
userRouter.get( '/listings/:id' , verifyUser , getUserListings )
userRouter.get( '/:id' , verifyUser ,  getUser )

export default userRouter