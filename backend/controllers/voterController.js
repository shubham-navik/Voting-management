const Voter = require('../models/voter');
const Election = require('../models/election');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// voter registration
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let voter = await Voter.findOne({ email });
        if (voter) {
            return res.status(400).json({ msg: "Voter already exists" });
        }
        voter = new Voter({
            name,
            email,
            password,
            govId: voter._id,//give unique id to voter
        });
        const salt = await bcrypt.genSalt(10);
        voter.password = await bcrypt.hash(password, salt);
        await voter.save();
        // const payload = {//data to be sent in token
        //     voter: {
        //         id: voter._id
        //     }
        // }
        // jwt.sign(payload, process.env.jwtSecret);
        res.send('Voter registered successfully');
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Error in registering');
    }
}

// voter login
exports.login = async (req, res) => {
    const { email, password  } = req.body;
    try {
        let voter = await Voter.findOne({ email });
        if (!voter) {
            return res.status(400).json({ msg: "Voter does not exist" });
        }
        const isMatch = await bcrypt.compare(password, voter.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Incorrect password" });
        }
        const payload = {//data to be sent in token
            voter: {
                id: voter._id,
                name: voter.name,
                email: voter.email,
                govId: voter.govId
            }
        };
        const token = jwt.sign(payload, process.env.jwtSecret);
        res.send({ message: 'Voter logged in successfully', voter,token });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Error in login');
    }
}

// do voting
exports.vote = async (req, res) => {
    const { electionId, partyId ,candidateId} = req.body;
    try {
        let voter = await Voter.findById(req.voter.id);
        if (!voter) {
            return res.status(400).json({ msg: "Voter does not exist" });
        }

        let election = await Election.findById(electionId);
        if (!election) {
            return res.status(400).json({ msg: "Election does not exist" });
        }
   
        let isPartyExist = election.parties.find(partyId);
        if (!isPartyExist) {
            return res.status(400).json({ msg: "Party does not exist in this election" });
        }    

        if (election.startDate > Date.now()) {
            return res.status(400).json({ msg: "Election has not started yet" });
        }
        if (election.endDate < Date.now()) {
            return res.status(400).json({ msg: "Election has ended" });
        }

        if (election.voters.includes(voter._id)) {
            return res.status(400).json({ msg: "You have already voted in this election" });
        }

        election.voters.push(voter._id);
        election.candidates.findById(candidateId).vote++;
        await election.save();
        res.send('Voted successfully');
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Error in voting');
    }
} 
