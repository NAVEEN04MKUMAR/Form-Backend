const express = require('express');
const router = express.Router();

const { Register } = require('../controllers/Form.js');
const { Loginform } = require('../controllers/Loginform.js');
const { Authenticatetoken, getuserinfo, updateuserinfo } = require('../controllers/Modifyuserdetails.js');

router.post('/register',Register);
router.post('/login',Loginform);
router.get('/userdetails',Authenticatetoken, getuserinfo);
router.put('/modifydetails', Authenticatetoken, updateuserinfo);



module.exports = router;