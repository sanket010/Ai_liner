import express from 'express';
import { generateResetOtp, getUserData, isLoggedIn, login, register } from '../controllers/userControllers.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/user-data', authUser, getUserData)
userRouter.get('/is-logged-in', authUser, isLoggedIn)
userRouter.post('/generate-reset-otp', generateResetOtp)

export default userRouter;