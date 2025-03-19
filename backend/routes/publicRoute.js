const express = require('express');
const router = express.Router();

const { getElections,pastElection ,ongoingElection,upcomingElection,getAllCandidate,getAllParty} = require('../controllers/publicController');

router.get('/elections', getElections);//get all elections
router.get('/pastElections', pastElection);//get all passed election
router.get('/ongoingElections', ongoingElection);//get all ongoing election
router.get('/upcomingElections', upcomingElection);// get all upcoming elections
router.get('/getAllCandidates', getAllCandidate);//to get all candidates
router.get('/getAllParties', getAllParty);//to get all parties


module.exports = router;