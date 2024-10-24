const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET="0cfc9a19c919eae8ae0ae999e761ab3bef4fd506ac9dabb938203ac826e1b8ea82c8103bb355de7f8b805f9e873223978c7fee8022d7718d788742838ee4d445";

// const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET', JWT_SECRET);
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

const token=jwt.sign({id: newuser._id,username:newuser.username,email:newuser.email},JWT_SECRET,{expiresIn:'1h'});
    res.status(200).json({message:'user registered successfully',token,username1:newuser.username,email1:newuser.email});

}catch(error){
console.error('error during registration',error);
 res.status(500).json({message:'server error'});

}

        // return res.status(200).json({message:'user registered successfully'});

}

module.exports={
    Register
};