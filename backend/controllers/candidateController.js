const Candidate = require('../models/candidate');
const Contestant = require('../models/contestant');
const Election = require('../models/election');
const Party = require('../models/party');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();


// candidate registration
exports.createCandidate = async (req, res) => {
    const { name, email, password, } = req.body;
    try {
        let candidate = await Candidate.findOne({ email });
        if (candidate) {
            return res.status(400).json({ msg: "Candidate already exists with this email" });
        }
        // const isPartyExist = await Party.findById(party);
        // if (!isPartyExist) {

        //     return res.status(400).json({ msg: "Party does not exist\nEnter a valid party Id." });
        // }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        candidate = new Candidate({
            name,
            email,
            password:hashPassword
        });
        await candidate.save();
        res.send('Candidate registered successfully');
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Error in registering');
    }
}

// candidate login
exports.candidateLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        let candidate = await Candidate.findOne({ email });
        if (!candidate) {
            return res.status(400).json({ msg: "Candidate does not exist with this email: "+email });
        }
        const isMatch = await bcrypt.compare(password, candidate.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password" });
        }
        const payload = {//data to be sent in token
            candidate: {
                id: candidate._id,
                name: candidate.name,
                email: candidate.email,
                // party: candidate.party,
                // participatedElections: candidate.participatedElections
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'24h'});
        res.send({message:'Candidate logged in successfully', candidate, token});
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Error in logging in');
    }
}
exports.participate = async (req, res) => {
    const { electionId } = req.body;

    try {//find candidate
        const candidate = await Candidate.findById(req.candidate.id);
        if (!candidate) {
            return res.status(400).json({ msg: "Candidate does not exist" });
        }
        //find election
        const election = await Election.findOne({ electionId });
        if (!election) {
            return res.status(400).json({ msg: `Election does not exist with Id: ${electionId}` });
        }
        //find contestant in election
        const contestant = await Contestant.findOne({ election: election });
        if (contestant) {
            return res.status(404).json({
                msg:"contestant already exist"
            })
        }
        //create contestant
        const newContestant = new Contestant({
            election:election,
            candidate:candidate
        });
        //save contestant 
        await newContestant.save();

        const currentTime = new Date();
        if (currentTime > election.startDate && currentTime < election.endDate) {
            return res.status(400).json({ msg: "Election is ongoing, cannot participate now" });
        }
        if (currentTime > election.endDate) {
            return res.status(400).json({ msg: "Election has ended, cannot participate" });
        }

        // Find party created by candidate
        const candidateParty = await Party.findOne({ createdBy: candidate });
        if (!candidateParty) {
            return res.status(400).json({ msg: "Candidate has not created a party yet" });
        }
        // console.log("\nelection:\n"+election)
        // console.log("\ncandidate:\n"+candidate)
        // console.log("\ncandidateParty:\n"+candidateParty)

        

        // Check if already participated
        const alreadyParticipated = candidate.participatedElections.some(obj => obj._id === election);
        if (alreadyParticipated) {
            return res.status(400).json({ msg: `Candidate already participated in election with Id: ${electionId}` });
        }

        // Add election record to candidate
        candidate.participatedElections.push(election);
        await candidate.save();

        // Add contestant and party to the election
        election.contestants.push(newContestant);
        election.parties.push(candidateParty);

        await election.save();


        res.status(200).json({ msg: `Candidate successfully participated in election with Id: ${electionId}` });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error in participating in election');
    }
};
