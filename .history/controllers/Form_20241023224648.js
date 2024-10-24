

const User=require('../models/userschema.js')

const Register=async(req,res)=>{

    const {email,password}=req.body;

    if(!email||!password){
        return res.status(400).json({message:'email and pass word are required'});
    }
try{
    const existinguser=await User.findOne({email});

    if(existinguser){
        return res.status(400).json({message:'email already registered'});
    }
    const newuser=new User({email,password});
    await newuser.save();
    res.status(201).json({message:'user registered successfully'});

}catch(error){
console.error('error during registration',error);
 res.status(500).json({message:'server error'});

}

        return res.status(200).json({message:'user registered successfully'});

}

module.exports={
    Register
};