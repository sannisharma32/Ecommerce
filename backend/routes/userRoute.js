import express from "express"

import {loginUser,ragisterUser,adminlogin} from "../controllesrs/userController.js"

const userRouter =express.Router();

userRouter.post('/register',ragisterUser)
userRouter.post('/login',loginUser)
userRouter.post('/adminlogin',adminlogin)

export default userRouter


