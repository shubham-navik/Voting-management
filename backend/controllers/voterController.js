const Voter = require('../models/voter');
const Election = require('../models/election');
const Candidate = require('../models/candidate');
const Contestant = require('../models/contestant')
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

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        voter = new Voter({
            name,
            email,
            password:hashPassword
            // govId: voter._id,//give unique id to voter
        });
        await voter.save();

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
                govId: voter._id.toString()
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn:'24h'});
        res.send({ message: 'Voter logged in successfully', voter,token });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Error in login');
    }
}

exports.profile = async (req, res) => {
    try {
        const id = req.voter.id;
        const voter = await Voter.findById(id);
        if (!voter) {
            return res.status(400).json({
                msg: "voter not found"
            })
        }
        // const { name, email } = voter;
        return res.status(200).json({
            msg: "voter profile",
            voter: {
                name: voter.name,
                email: voter.email,
                govId: voter._id.toString()
            }
        })

    } catch (err) {
        return res.status(500).json({
            msg: "Error in getting voter profile",
            error: err.message
        })
    }
}

// do voting
exports.vote = async (req, res) => {
    const { electionId, candidateId } = req.body;
    
    try {
        // Find voter
        let voter = await Voter.findById(req.voter.id);
        if (!voter) {
            return res.status(400).json({ msg: "Voter does not exist" });
        }

        // Find election
        let election = await Election.findOne({ electionId: electionId });
        if (!election) {
            return res.status(400).json({ msg: "Election does not exist" });
        }
        // console.log(election);

        // Check election timing
        if (new Date(election.startDate) > new Date()) {
            return res.status(400).json({ msg: "Election has not started yet" });
        }
        if (new Date(election.endDate) < new Date()) {
            return res.status(400).json({ msg: "Election has ended" });
        }

        // Check if voter has already voted
        const isVoter = election.voters.includes(voter._id);
        if (isVoter) {
            return res.status(400).json({ msg: "You have already voted" });
        }

        const contestant = await Contestant.findOne({candidate : candidateId});

        if(!contestant){
            return res.status(400).json({ msg: "contestant does not exist in this election" });
        }
        console.log(contestant);
        console.log(election.contestants);
        // Update candidate votes
        const contestantId = election.contestants.includes(contestant._id);
        console.log(contestantId);
        if (!contestantId) {
            return res.status(404).json({
                msg:"Contestant not found in election :"+electionId
            })
        }
        // do vote
        contestant.votes++;
        // Add voter to election voters list and updates the contestant schema
        election.voters.push(voter);
        await contestant.save()

        // Save the updated election data
        await election.save();

        res.status(200).json({ msg: "Voted successfully" });
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send("Error in voting");
    }
};


// all voted elections bu

exports.votedElections = async (req, res) => {
    try {
        const voterId = req.voter.id;
        const elections = await Election.find();
        const participatedElections = [];
        for (const election of elections) {
            const isVoter = election.voters.includes(voterId);
            if (isVoter) {
                const electionId = election.electionId;
                const title = election.title;
                participatedElections.push({
                    electionId,
                    title,
                })
            }
        }


        return res.status(200).json({
            msg: "voter participated elections",
            participatedElections
        })
    } catch (err) {
        return res.status(500).json({
            msg:"Error in getting participated elections"
        })
    }
}
