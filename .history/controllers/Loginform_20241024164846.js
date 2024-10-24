const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const User=require('../models/userschema.js');
const JWT_SECRET="0cfc9a19c919eae8ae0ae999e761ab3bef4fd506ac9dabb938203ac826e1b8ea82c8103bb355de7f8b805f9e873223978c7fee8022d7718d788742838ee4d445";

// const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET', JWT_SECRET);


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