const express = require('express');
const router = express.Router();

const { register, login,vote } = require('../controllers/voterController');
const { voterAuth } = require('../middleware/voterMiddleware');

router.post('/register', register);//register voter
router.post('/login', login);//login voter
router.post('/vote', voterAuth, vote);//vote in election

module.exports = router;
