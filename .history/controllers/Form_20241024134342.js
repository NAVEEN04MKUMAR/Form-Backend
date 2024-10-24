const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET;

const User=require('../models/userschema.js')

const Register=async(req,res)=>{
    console.log('Received data:', req.body);

    const { username,email,password,confirmpassword}=req.body;
    console.log('Hashing password for:', email);


    if( !username||!email||!password||!confirmpassword){
        return res.status(400).json({message:'email and password are required'});
    }
try{
    const existinguser=await User.findOne({username});
    console.log('existinguser', existinguser);

    if(existinguser){
        return res.status(400).json({message:'user already registered'});
    }
    const existingemail=await User.findOne({email});
    console.log('existingemail', existingemail);

    if(existingemail){
        return res.status(400).json({message:'email already registered'});
    }

    const hashedpassword=await bcrypt.hash(password,10);
    console.log('hashedpassword', hashedpassword);

    const newuser=new User({ username,email,password:hashedpassword});
    console.log('newuser', newuser);

    await newuser.save();
    // User.push(newuser);

const token=jwt.sign({email},JWT_SECRET,{expiresIn:'1h'});
    res.status(201).json({message:'user registered successfully',token});

}catch(error){
console.error('error during registration',error);
 res.status(500).json({message:'server error'});

}

        return res.status(200).json({message:'user registered successfully'});

}

module.exports={
    Register
};