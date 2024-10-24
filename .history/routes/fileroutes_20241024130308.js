const express = require('express');
const router = express.Router();

const { Register } = require('../controllers/Form.js');
router.post('/register',Register);

module.exports = router;