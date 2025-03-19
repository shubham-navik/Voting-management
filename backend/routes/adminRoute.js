const express = require('express');
const router = express.Router();

const { createAdmin, adminLogin ,getAllVoter} = require('../controllers/adminController');
const {createElection,updateElection,deleteElection,getAllElections} = require('../controllers/electionController');
const { adminAuth } = require('../middleware/adminMiddleware');

router.post('/register', createAdmin);//register admin
router.post('/login', adminLogin);//login admin
router.post('/createElection', adminAuth, createElection);//create election
router.put('/updateElection', adminAuth, updateElection);//update election
router.delete('/deleteElection', adminAuth, deleteElection);//delete election
router.get('/getAllelections', adminAuth, getAllElections);//get all election
router.get('/getAllVoters',adminAuth, getAllVoter);//to get all eligible voter


module.exports = router;