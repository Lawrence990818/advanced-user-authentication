import express from 'express'
import dotenv from  'dotenv'
import { connectDB } from './db/connectDB.js';
import authRoutes from './routes/auth.routes.js'

dotenv.config()

const app = express();
app.use(express.json())
app.use('/api/auth', authRoutes)


app.listen(process.env.PORT, ()=>{
    connectDB() //
    console.log(`Server is running on port ${process.env.PORT}`)
})