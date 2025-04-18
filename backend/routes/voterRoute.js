const express = require('express');
const router = express.Router();

const { register, login,vote,profile ,votedElections} = require('../controllers/voterController');
const { voterAuth } = require('../middleware/voterMiddleware');

router.post('/register', register);//register voter
router.post('/login', login);//login voter
router.post('/vote', voterAuth, vote);//vote in election
router.get('/profile', voterAuth, profile);//voter profile
router.get('/votedElections', voterAuth, votedElections);//to get the election in which voter has voted

module.exports = router;
