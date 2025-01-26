import jwt from 'jsonwebtoken';


const authUser = async (req, res,next) => {
    const { token } = req.headers
    try {
        if (!token) {
            return res.json({ success: false, message: 'Not authorized, token not found' });
        }
        console.log(token);
        

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.body.userId = decoded.userId
        next()

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

export default authUser;