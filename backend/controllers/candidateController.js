const Candidate = require('../models/candidate');
const Contestant = require('../models/contestant');
// const election = require('../models/election');
const Election = require('../models/election');
const Party = require('../models/party');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config();


// candidate registration

exports.createCandidate = async (req, res) => {
    
    try {
      const { name, email, password } = req.body;
    // Check if candidate already exists
    let existingCandidate = await Candidate.findOne({ email });
    if (existingCandidate) {
      return res.status(400).json({ msg: 'Candidate already exists with this email' });
    }
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

        // Create and save the new candidate
        console.log(existingCandidate)
    existingCandidate = new Candidate( {
      name,
      email,
      password: hashedPassword,
    });
    console.log(existingCandidate)
    await existingCandidate.save();
    console.log(existingCandidate)

    res.status(201).json({ msg: 'Candidate registered successfully' });
  } catch (err) {
    console.error('Error in candidate registration:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

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
  
    try {
      // Find candidate
      const candidate = await Candidate.findById(req.candidate.id);
      if (!candidate) {
        return res.status(400).json({ msg: "Candidate does not exist" });
      }
  
      // Find election
      const election = await Election.findOne({ electionId });
      if (!election) {
        return res.status(400).json({ msg: `Election does not exist with Id: ${electionId}` });
      }
  
      // Check if election is ongoing or ended
      const currentTime = new Date();
      if (currentTime > election.startDate && currentTime < election.endDate) {
        return res.status(400).json({ msg: "Election is ongoing, cannot participate now" });
      }
      if (currentTime > election.endDate) {
        return res.status(400).json({ msg: "Election has ended, cannot participate" });
      }
  
      // Check if candidate already a contestant in this election
      const alreadyContestant = await Contestant.findOne({
        election: election._id,
        candidate: candidate._id,
      });
      if (alreadyContestant) {
        return res.status(400).json({ msg: "Candidate already a contestant in this election" });
      }
  
      // Check if candidate already participated
      const alreadyParticipated = candidate.participatedElections.some(
        (eId) => eId.toString() === election._id.toString()
      );
      if (alreadyParticipated) {
        return res.status(400).json({ msg: `Candidate already participated in election with Id: ${electionId}` });
      }
  
      // Find the party created by the candidate
      const candidateParty = await Party.findOne({ createdBy: candidate._id });
      if (!candidateParty) {
        return res.status(400).json({ msg: "Candidate has not created a party yet" });
      }
  
      // Create new contestant
      const newContestant = new Contestant({
        election: election._id,
        candidate: candidate._id,
      });
      await newContestant.save();
  
      // Update candidate
      candidate.participatedElections.push(election._id);
      await candidate.save();
  
      // Update election
      election.contestants.push(newContestant._id);
      election.parties.push(candidateParty._id);
      await election.save();
  
      return res.status(200).json({ msg: `Candidate successfully participated in election with Id: ${electionId}` });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Error in participating in election");
    }
  };
  


// get all election participated by me (candidate)
exports.getParticipatedElection = async (req, res) => {
    try {

        const candidate = await Candidate.findById(req.candidate.id);
        if (!candidate) {
            return res.status(400).json({ msg: "Candidate does not exist" });
        }

        const participatedElections = candidate.participatedElections;

        // const allElections = await Election.find({ electionId: { $in: participatedElectionIds } });

        res.status(200).json({
            msg: `All elections participated by ${candidate.name}`,
            participatedElections
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg:"err finding ellection by candidate"
        })
    }
} 