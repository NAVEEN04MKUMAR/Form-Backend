const User=require('../models/userschema.js');


const getuserinfo = async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select('-password');
      if (!user)
      return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };


const updateuserinfo = async (req, res) => {
    try {
      const { email, username } = req.body;
      const updateduser = await User.findByIdAndUpdate(
        req.user.id,
        { email, username },
        { new: true }
      );
      res.json(updateduser);
    } catch (error) {
      res.status(500).json({ message: 'Error updating user info' });
    }
  };
  
  module.exports = {
    getuserinfo,
    updateuserinfo,
  };