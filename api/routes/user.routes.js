import express from 'express'
const userRouter = express.Router()
import test from '../controllers/user.controller.js'
import { updateUser } from '../controllers/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

userRouter.get( '/test' , test)
userRouter.put( '/update/:id' , verifyUser , updateUser )

export default userRouter