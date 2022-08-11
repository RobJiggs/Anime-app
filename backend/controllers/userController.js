const jwt= require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const asyncHandler=require('express-async-handler')
const User=require('../models/userModel')
const { use } = require('../routes/goalRoutes')
// des register new user
// Post /api/users
// @access public


const registerUser=asyncHandler( async(req,res)=>{
    const {name ,email, password}=req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }
    // check if user exists
    const userExists=await User.findOne({email})

    if (userExists){
        res.status(400)
        throw new Error('User already exists')
    }
    // hash password
    const salt= await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const user =await User.create({
        name,
        email,
        password:hashedPassword


    })
    if(user){
        res.status(201).json({
        _id:user.id,
        name:user.name,
        email:user.email,
        token:generateToken(user._id)
    })

    }
    else{
        res.status(400)
        throw new Error('Invalid user data')
    }

    

})
// des authenicate user
// Post /api/users/login
// @access public


const loginUser=asyncHandler( async(req,res)=>{
    const {email,password}=req.body
    
    const user= await User.findOne({email})
    if (user &&(await bcrypt.compare(password,user.password))){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        })
            

    }else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }

   

})
// des get user data
// Get /api/users/me
// @access private


const getMe=asyncHandler( async(req,res)=>{
    res.json({message:'Display User data'})

})

const generateToken=(id)=>{
    return jwt.sign( {id},process.env.JWT_SECRET ,{
        expiresIn:'30d'
    })

}


module.exports={
    registerUser,getMe,loginUser

}