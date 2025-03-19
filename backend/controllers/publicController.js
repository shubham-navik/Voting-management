const Election = require('../models/election');
const Candidate = require('../models/candidate');
const Party = require('../models/party')

//get all Elections
exports.getElections = async (req, res) => {
    try {
        const elections = await Election.find({});
        res.status(200).json({
            status: 'successfull fetched All Elections',
            elections
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'error to fetched All elections',
            message: err.message
        })
    }
}

// get past election

exports.pastElection = async (req, res) => {
    try {

        const allElections = await Election.find({});

        const pastElections = allElections.filter(obj => obj.status === 'completed');
        console.log(pastElections);
        res.status(200).json({
            msg: "passed Election are :"+pastElections.length,
            pastElections
        });


        
    } catch (err) {
        console.log(err);
        res.status(400).json({
            msg:"error in getting past elections",
        })
    }
}

//onging election

exports.ongoingElection = async (req, res) => {
    try {
        const allElections = await Election.find({});

        const ongoingElections = allElections.filter(obj => obj.status === 'ongoing');
        console.log(ongoingElections);
        res.status(200).json({
            msg: "ongoing Election are :"+ongoingElections.length,
            ongoingElections
        });

    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            msg:"error in fetching onging elections"
        })
    }
}

//to get upcomming election
exports.upcomingElection = async (req, res) => {
    try {
        const allElections = await Election.find({});

        const upcomingElections = allElections.filter(obj => obj.status === 'pending');
        console.log(upcomingElections);
        res.status(200).json({
            msg: "upcoming Election are :"+upcomingElections.length,
            upcomingElections
        });

    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            msg:"error in fetching upcoming elections"
        })
    }
}

// to get candidate
exports.getAllCandidate = async (req, res) => {
    try {
        const allCandidate = await Candidate.find({});

        res.status(200).json({
            msg: " All Candidate ",
            allCandidate
        })

    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg:"Err geting Candidates"
        })
    }
}

// get All Parties
exports.getAllParty = async (req, res) => {
    try {
        const allParties = await Party.find({})
        res.status(200).json({
            msg: "All Paries",
            allParties
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg:"err while fetching all party"
        })
    }
}