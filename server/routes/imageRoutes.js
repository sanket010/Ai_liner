import express from "express"
import authUser from "../middlewares/authUser.js"
import { generateImage } from "../controllers/imageContollers.js"


const imageRouter = express.Router()
imageRouter.post("/generate-image", authUser, generateImage)


export default imageRouter