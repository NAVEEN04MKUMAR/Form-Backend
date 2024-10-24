const express = require('express');
const router = express.Router();

const { Register } = require('../controllers/Form.js');

router.post('/register',Register);
router.post('/login',Loginform);



module.exports = router;