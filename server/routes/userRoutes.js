import express from 'express';
import { generateResetOtp, getUserData, isLoggedIn, login, register, userCredits } from '../controllers/userControllers.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router()

// User authentication routes
userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/is-logged-in', authUser, isLoggedIn)
userRouter.post('/generate-reset-otp', generateResetOtp)
userRouter.get('/get-user-data', authUser, getUserData)
userRouter.get('/user-credits', authUser, userCredits)

export default userRouter;