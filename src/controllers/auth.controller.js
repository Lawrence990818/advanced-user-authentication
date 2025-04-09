import { User } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import { generateVerificationCode } from "../utils/generateVerificationCode.js"
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js"
import { sendVerificationEmail } from "../mailtrap/mailtrap.email.js"

export const signup = async (req, res) => {
   const {email, password, name} = req.body
    try {
        if(!email || !password || !name){
            throw new Error("All fileds are required.")
        }
        const userAlreadyExists  = await  User.findOne({email})
        if(userAlreadyExists){
            return res.status(400).json({success: false, message: "User already exists."})
        }
        // encrypt the password
        const hashedPassword  = await bcryptjs.hash(password, 10)
        // generate verification token
        const verificationToken = generateVerificationCode()
       

        const user = new User({
            email,
            password: hashedPassword,
            name,
            verificationToken,
            verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 *1000 //24 hours
        })
        await user.save()

        // jwt token
        generateTokenAndSetCookie(res,user._id)
         // send verifcation token email
         await sendVerificationEmail(user.email, verificationToken);

        res.status(201).json({
            success: true,
            message:"User created successfully",
            user:{
                ...user._doc,
                password: undefined
            },
        })

   } catch (error) {
      return res.status(400).json({success: false, message: error.message })
   }
}

export const signin = async (req, res) =>{
    res.send("Hello")
}

export const logout  = async (req, res) =>{
    res.send("Hello")
}