const express = require('express');
const router = express.Router();

const { createCandidate, candidateLogin, participate,getParticipatedElection } = require('../controllers/candidateController');
const { createParty } = require('../controllers/partyController');
const {candidateAuth}=require('../middleware/candidateMiddleware');

router.post('/register', createCandidate);//register candidate
router.post('/login', candidateLogin);//login candidate
router.post('/participate',candidateAuth, participate);//participate in election
router.post('/createParty', candidateAuth, createParty);//create party
router.get('/getParticipatedElections', candidateAuth, getParticipatedElection);// all particapted election by login  candidate

module.exports = router;