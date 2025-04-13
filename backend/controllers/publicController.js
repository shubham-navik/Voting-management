const Election = require('../models/election');
const Candidate = require('../models/candidate');
const Party = require('../models/party')
const Contestant = require('../models/contestant');

//get all Elections
exports.getElections = async (req, res) => {
    try {
        const elections = await Election.find({});
        res.status(200).json({
            status: 'successfull fetched All Elections',
            msg:"All elections",
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
        const tempCandidates = await Candidate.find({});
        const allCandidates = [

        ];
        for (const candidate of tempCandidates) {
            const party = await Party.findById(candidate.party);
            if (!party) {
                return res.status(404).json({
                    msg:"party not found"
                })
            }
            const partyName = party.name;
            const candidateName = candidate.name;
            const email = candidate.email;
            const participatedElections = candidate.participatedElections.length;
            const tempCandidate = {
                _id: candidate._id,
                name: candidateName,
                email,
                party: {
                    name: partyName,
                    id: candidate.party
                },
                participatedElections
            }
            allCandidates.push(tempCandidate);
        }

        res.status(200).json({
            msg: " All Candidate ",
            allCandidates
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

//get Election result by id

exports.getElectionResultById = async (req, res) => {
    try {
        const electionId = req.params.id;
        if (!electionId) {
            return res.status(400).json({
                msg: "election id required"
            })
        }
        const election = await Election.findById(electionId);
        if (!election) {
            return res.status(404).json({
                msg:"election not found"
            })
        }

        const contestants = election.contestants;
        const results = [];
        for (const contestant of contestants) {
            const tempcontest = await Contestant.findById(contestant);
            const candidate = await Candidate.findById(tempcontest.candidate)
            if (!candidate) {
                return res.status(404).json({
                    msg:"contestant not found"
                })
            }
            const partyId = await Party.findById(candidate.party);
            if (!partyId) {
                return res.status(404).json({
                    msg:"party not found"
                })
            }
            const candidateName = candidate.name;
            const partyName = partyId.name;
            const votes = tempcontest.votes;
            const result = {
                candidateName,
                partyName,
                votes
            };
            results.push(result);

        }


        return res.status(200).json({
            msg: "Election results",
            electionName:election.title,
            results
        })

          
    }
    catch (err) {
        console.log(err)
    }
}