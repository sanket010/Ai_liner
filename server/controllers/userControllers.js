import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from 'razorpay'
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


const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export const razorpayPayment = async (req, res) => {
    try {

        const { userId, planId } = req.body;
        const userData = await userModel.findById(userId)

        if (!userData || !planId) {
            return res.json({ success: false, message: 'Missing details' })
        }


        // plan selection
        let credits, plan, amount, date;
        switch (planId) {
            case "Basic":
                credits = 100;
                plan = "Basic";
                amount = 10;
                break;
            case "Advanced":
                credits = 500;
                plan = "Advanced";
                amount = 50;
                break;
            case "Business":
                credits = 5000;
                plan = "Business";
                amount = 250;
                break;

            default:
                return res.json({ success: false, message: "Plan not found" });
        }

        // 
        date = Date.now()

        const transactionData = {
            userId, plan, amount, credits, date
        }
        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: newTransaction._id,
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error });
            }

            res.json({ success: true, order })

        })



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export const verifyRazorpay = async (req, res) => {
    try {

        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (orderInfo.status === "paid") {
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if (transactionData.payment) {
                // already verified
                return res.json({ success: false, message: "Payment failed" })
            }
            else {
                const userData = await userModel.findById(transactionData.userId)

                const creditBalance = userData.creditBalance + transactionData.credits;
                await userModel.findByIdAndUpdate(userData._id, { creditBalance })
                await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })

                res.json({ success: true, message: "Credits Added" });

            }
        }
        else {
            res.json({ success: false, message: "Payment Failed" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}