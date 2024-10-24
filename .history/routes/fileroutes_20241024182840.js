const express = require('express');
const router = express.Router();

const { Register } = require('../controllers/Form.js');
const { Loginform } = require('../controllers/Loginform.js');
const { authenticatetoken, getuserinfo, updateuserinfo } = require('../controllers/Modifyuserdetails.js');

router.post('/register',Register);
router.post('/login',Loginform);
router.get('/userdetails',authenticatetoken, getuserinfo);
router.put('/modifydetails', authenticatetoken, updateuserinfo);



module.exports = router;