import express from 'express'
import dotenv from  'dotenv'
import cookieParser from 'cookies-parser'
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.routes.js'

dotenv.config()

const app = express();
const PORT  = process.env.PORT || 5000

app.use(express.json()) // allows us to parser icoming request: res.body
app.use(cookieParser()) // allows us to parse  incoming cookies

app.use('/api/auth', authRoutes)

app.listen(PORT, ()=>{
    connectDB() //
    console.log(`Server is running on port ${PORT}`)
})