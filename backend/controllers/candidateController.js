const Candidate = require('../models/candidateModel');
const Election = require('../models/electionModel');
const Party = require('../models/partyModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// candidate registration
exports.createCandidate = async (req, res) => {
    const { name, email, password, party } = req.body;
    try {
        let candidate = await Candidate.findOne({ email });
        if (candidate) {
            return res.status(400).json({ msg: "Candidate already exists with this email" });
        }
        const isPartyExist = await Party.findById(party);
        if (!isPartyExist) {
            return res.status(400).json({ msg: "Party does not exist\nEnter a valid party Id." });
        }
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        candidate = new Candidate({
            name,
            email,
            password,
            party
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
exports.login = async (req, res) => {
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
                party: candidate.party,
                // participatedElections: candidate.participatedElections
            }
        };
        const token = jwt.sign(payload, process.env.jwtSecret);
        res.send({message:'Candidate logged in successfully', candidate, token});
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Error in logging in');
    }
}

// participate in election

exports.participate = async (req, res) => {
    const { electionId } = req.body;
    try {
        let candidate = await Candidate.findById(req.candidate.id);
        if (!candidate) {
            return res.status(400).json({ msg: "Candidate does not exist" });
        }

        let election = await Election.findById(electionId);
        if (!election) {
            return res.status(400).json({ msg: "Election does not exist with Id: " + electionId });
        }
        
        let alreadyExistInThisElection = candidate.participatedElections.findById(electionId);
        if (alreadyExistInThisElection) {
                return res.status(400).json({ msg: "Candidate already participated in this election with Id"+electionId });
        }    

        candidate.participatedElections.unshift({ elections: electionId });
        await candidate.save();
        res.send('Candidate participated successfully in election with Id: ' + electionId);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Error in participating in election');
    }
}

// create party
exports.createParty = async (req, res) => {

    const { name, slogon, partyId } = req.body;//extracting data from request body
    
    try {
        //check if party already exists
        let isExistParty = await Party.findOne(partyId);
        if (isExistParty) {
            return res.status(400).json({ msg: "Party already exists with this Id: " + partyId });
        }
        //check if party already exists with name or slogon
        let isExistPartyName = await Party.findOne({ name });
        if (isExistPartyName) {
            return res.status(400).json({ msg: "Party already exists with this name: " + name });
        }
        //check if party already exists with name or slogon
        let isExistPartySlogon = await Party.findOne({ slogon });
        if (isExistPartySlogon) {
            return res.status(400).json({ msg: "Party already exists with this slogon: " + slogon });
        }
        //create new party
        let party = new Party({
            name,
            slogon,
            partyId,
            createdBy: req.candidate.id
        });
        //save party
        await party.save();
        //send response to candidate
        res.send({msg:'Party created successfully with Id: ' + partyId, party});  

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Error in creating party');
    }
}
