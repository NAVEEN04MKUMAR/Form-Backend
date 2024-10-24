const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User=require('../models/userschema.js')

const Loginform=async(req,res)=>{
    console.log('Received data:', req.body);

    const { email,password}=req.body;


    if(!email||!password){
        return res.status(400).json({message:'email and password are required'});
    }
try{
    const existingemail=await User.findOne({email});
    console.log('existingemail', existingemail);

    if(existingemail){
        return res.status(400).json({message:'invalid crediantials'});
    }

    const comparepassword=await bcrypt.compare(password,existingemail.password);
    console.log('hashedpassword', comparepassword);
    
    if(!comparepassword){
        return res.status(400).json({message:'invalid crediantials'});
    }


const token=jwt.sign({id: existingemail._id},JWT_SECRET,{expiresIn:'1h'});
    res.status(200).json({message:'user login successfully',token, user: { id: existingemail._id, email:existingemail.email }});

}catch(error){
console.error('error during registration',error);
 res.status(500).json({message:'server error'});

}

        // return res.status(200).json({message:'user registered successfully'});

}

module.exports={
    Loginform
};