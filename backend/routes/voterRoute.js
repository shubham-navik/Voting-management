const express = require('express');
const router = express.Router();

const { register, login,vote,profile } = require('../controllers/voterController');
const { voterAuth } = require('../middleware/voterMiddleware');

router.post('/register', register);//register voter
router.post('/login', login);//login voter
router.post('/vote', voterAuth, vote);//vote in election
router.get('/profile', voterAuth, profile);//voter profile

module.exports = router;
