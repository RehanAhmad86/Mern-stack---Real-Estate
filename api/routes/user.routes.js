import express from 'express'
const userRouter = express.Router()
import test from '../controllers/user.controller.js'

userRouter.get( '/test' , test)

export default userRouter