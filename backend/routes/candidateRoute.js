const express = require('express');
const router = express.Router();

const { createCandidate, candidateLogin, participate } = require('../controllers/candidateController');
const { createParty } = require('../controllers/partyController');
const {candidateAuth}=require('../middleware/candidateMiddleware');

router.post('/register', createCandidate);//register candidate
router.post('/login', candidateLogin);//login candidate
router.post('/participate',candidateAuth, participate);//participate in election
router.post('/createParty',candidateAuth, createParty);//create party

module.exports = router;