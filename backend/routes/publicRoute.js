const express = require('express');
const router = express.Router();

const {  pastElection, ongoingElection, upcomingElection, getAllCandidate, getAllParty, getElectionResultById } = require('../controllers/publicController');
const {getAllElections} = require('../controllers/electionController');

router.get('/elections', getAllElections);//get all elections
router.get('/pastElections', pastElection);//get all passed election
router.get('/ongoingElections', ongoingElection);//get all ongoing election
router.get('/upcomingElections', upcomingElection);// get all upcoming elections
router.get('/getAllCandidates', getAllCandidate);//to get all candidates
router.get('/getAllParties', getAllParty);//to get all parties
router.get('/getElectionResult/:id', getElectionResultById);//get result of election by election id


module.exports = router;