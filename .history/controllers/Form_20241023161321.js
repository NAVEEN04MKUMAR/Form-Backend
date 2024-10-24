



const Register=async(req,res)=>{

    const {email,password}=req.body;

    if(!email||!password){
        return res.status(400).json({message:'email and pass word are required'});
    }
        return res.status(200).json({message:'user registered successfully'});

}

module.exports={
    Register
};