import express from 'express'
import cors from 'cors'
import 'dotenv/config'

import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'

const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(cors())
await connectDB()

app.get('/', (req, res) => {
    res.json('API Working')
})

app.use('/api/user',userRouter)

app.listen(PORT, () => { 
    console.log('Server is running at port', PORT)
})
