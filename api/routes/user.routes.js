import express from 'express'
const userRouter = express.Router()
import test from '../controllers/user.controller.js'
import { updateUser , deleteUser } from '../controllers/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

userRouter.get( '/test' , test)
userRouter.put( '/update/:id' , verifyUser , updateUser )
userRouter.delete( '/delete/:id' , verifyUser , deleteUser )

export default userRouter