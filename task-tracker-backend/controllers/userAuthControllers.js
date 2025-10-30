const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/userModel')

const registerUser = async (req, res) =>{
    try {
        const {name, email, password} = req.body
        if (!name || !email || !password){
            return res.status(400).json({message:'requires all the details of the user'}) //400 validation error code
        }
        const user = await User.findOne({email})
        if(user){
            return res.status(409).json({message:'User already exists with this email.'}) //409 duplication error code
        }        
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser =await User.create({name, email, password:  hashedPassword})
        return res.status(201).json({message:'User registered successfully. Login user', userId: newUser._id})
    } catch (error) {
        console.error('error: ', error.message)
        return res.status(500).json({message:error.message})
    }

}

const LoginUser = async (req, res)=>{
    try {
        const {email , password} = req.body
        if (!email || !password){
            return res.status(400).json({message:'requires both email and password'})
        }
        const existingUser = await User.findOne({email})
        if (!existingUser){
            return res.status(404).json({message:'User Not found with this email'}) //404 not found code
        }
        const isPasswordSame =await  bcrypt.compare(password, existingUser.password)
        if(!isPasswordSame){
            return res.status(401).json({message:'Password is not matching'}) //401 unauthorized code
        }
        const token = jwt.sign({userId: existingUser._id,email: existingUser.email}, process.env.JWT_SECRET, {expiresIn:'1h'})
        return res.status(200).json({message:'User login successful', token : token}) //200 success code
        
    } catch (error) {
        console.log('error: ',error.message)
        return res.status(500).json({message: error.message})
    }

}

module.exports = {registerUser, LoginUser}