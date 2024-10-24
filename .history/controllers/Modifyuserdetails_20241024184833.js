const jwt = require('jsonwebtoken');
const User=require('../models/userschema.js');



const JWT_SECRET="0cfc9a19c919eae8ae0ae999e761ab3bef4fd506ac9dabb938203ac826e1b8ea82c8103bb355de7f8b805f9e873223978c7fee8022d7718d788742838ee4d445";
// const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET', JWT_SECRET);




const Authenticatetoken = (req, res,next) => {
    // console.log(' request ', req );

    const token = req.headers['authorization'];
    console.log(' token ',  token );

    if (!token){ 
        console.log('No token provided, access denied');
      return res.status(401).json({ message: 'Access Denied' });
    }
  
    jwt.verify(token,JWT_SECRET, (err, username) => {
      if (err) {
        console.log('Token verification failed:', err.message);
        return res.status(403).json({ message: 'Invalid Token' });
      }
      console.log('Token verified, user:', user);
      req.username = username;
      next();

    });
  };

const getuserinfo = async (req, res) => {
    console.log('Fetching user info for user ID:', req.user.id);

    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user){
        console.log('User not found for ID:', req.user.id);
        return res.status(404).json({ message: 'User not found' });
      }
      console.log('User found:', user);
      res.json(user);
    } catch (error) {
        console.error('Error fetching user info:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };


const updateuserinfo = async (req, res) => {
    console.log('Updating user info for user ID:', req.user.id);
    console.log('Update data:', req.body);

    try {
      const { email, username } = req.body;
      const updateduser = await User.findByIdAndUpdate(
        req.user.id,
        { email, username },
        { new: true }

      );
      if (!updateduser) {
        console.log('Failed to update user. User not found for ID:', req.user.id);
        return res.status(404).json({ message: 'User not found' });
    }
      
      console.log('User updated successfully:', updateduser);
      res.json(updateduser);
    } catch (error) {
        console.error('Error updating user info:', error);
      res.status(500).json({ message: 'Error updating user info' });
    }
  };
  
  module.exports = {
    getuserinfo,
    updateuserinfo,
    Authenticatetoken
  };