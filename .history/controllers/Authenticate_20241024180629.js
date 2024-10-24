const jwt = require('jsonwebtoken');



const JWT_SECRET="0cfc9a19c919eae8ae0ae999e761ab3bef4fd506ac9dabb938203ac826e1b8ea82c8103bb355de7f8b805f9e873223978c7fee8022d7718d788742838ee4d445";
// const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET', JWT_SECRET);

// Middleware to verify JWT
const AuthenticateToken = (req, res) => {
  const token = req.headers['authorization'];
  if (!token){ 
    return res.status(401).json({ message: 'Access Denied' });
  }

  jwt.verify(token,JWT_SECRET, (err, user) => {
    if (err) 
    return res.status(403).json({ message: 'Invalid Token' });
    req.user = user;
  });
};

module.exports={
    AuthenticateToken
};