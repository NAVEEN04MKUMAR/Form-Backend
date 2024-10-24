const express = require('express');
const router = express.Router();

const { Register } = require('../controllers/Form.js');
router.post('/upload',Register);
