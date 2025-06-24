import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transactionModel from "../models/transectionModel.js";

// register user
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Name, email, password must be provided.' });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // checking existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: 'Email already exists.' })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create new user
        const user = new userModel({
            name,
            email,
            password: hashedPassword
        })
        const newUser = await user.save();

        // generate token
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)

        res.json({ success: true, message: "User Created successfully", token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }


}

// login user
export const login = async (req, res) => {

    try {
        const { name, email, password } = req.body;
        if (!email || !password) {
            return res.json({ success: false, message: 'Email, password must be provided.' });
        }

        // checking existing user
        const existingUser = await userModel.findOne({ email })
        if (!existingUser) {
            return res.json({ success: false, message: 'User not found' })
        }

        const isValidPassword = await bcrypt.compare(password, existingUser.password)
        if (!isValidPassword) {
            return res.json({ success: false, message: "Incorrect credentials" })
        }

        // generate token
        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET)

        res.json({ success: true, message: "login success", token })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }


}

// logout user 
export const logout = async (req, res) => { }

// is user logged in
export const isLoggedIn = async (req, res) => {
    try {

        res.json({ success: true })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// generate reset otp 
export const generateResetOtp = async (req, res) => {

    try {

        const { email } = req.body;
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: 'User not found' })
        }

        // generate otp
        const otp = Math.floor(100000 + Math.random() * 900000)
        console.log(otp)
        const otpExpiry = Date.now() + 30 * 60 * 100

        // save otp in user document
        user.resetOtp = otp.toString()
        await user.save()

        res.json({ success: true, message: "hello" })




    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }

}

// verify reset otp
export const verifyResetOtp = async (req, res) => {

}

// create new reset password
export const createNewResetPassword = async (req, res) => {

}

// get user data
export const getUserData = async (req, res) => {
    try {

        const { userId } = req.body

        const user = await userModel.findById(userId)

        const userData = {
            name: user.name,
        }

        res.json({ success: true, userData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export const userCredits = async (req, res) => {
    const { userId } = req.body
    try {

        const user = await userModel.findById(userId)
        res.json({ success: true, credits: user.creditBalance, user: { name: user.name } })

    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log(error);
    }

}

export {
    
    
    
    
    
}