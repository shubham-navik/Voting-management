const election = require('../models/election');
const Election = require('../models/election');
const Party = require('../models/party');


exports.createElection = async (req, res) => {
    const {electionId, title, description,  start, end } = req.body;
    
    try {
        let election = await Election.findOne({electionId:electionId});
        if (election) {
            return res.status(400).json({ msg: "Election already exists with this Id: " + electionId });
        }


        election = new Election({
            electionId,
            title,
            description,
            startDate: start,
            endDate: end,
        });

        await election.save();
        res.send('Election created successfully \n ' + election);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Error in creating election');
    }
}

//updtae election
exports.updateElection = async (req, res) => {
    const { electionId, title, description, start, end } = req.body;

    try {
        let election = await Election.findOne({ electionId: electionId });
        if (!election) {
            return res.status(404).json({ msg: "Election not found with this Id: " + electionId });
        }

        election.title = title;
        election.description = description;
        election.startDate = start;
        election.endDate = end;

        await election.save();
        res.json({ msg: "Election updated successfully", election });
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Error in updating election');
    }
}


// delete election

exports.deleteElection = async (req, res) => {
    const { electionId } = req.body;
    try {
        const election = await Election.findOne({ electionId: electionId });
        if (!election) {
            return res.status(500).json({
                msg: "Electon not Found"
            });
        }
        
        Election.findByIdAndDelete(election._id);
        

        res.status(200).json({
            msg:"Deleted successfully\n"
        })

    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Error in deleting election');
    }
}

// get all elections

exports.getAllElections = async (req, res) => {
    try {
        const allElections = await Election.find({});
        
        res.status(200).json({
            msg: "total electons is :" + allElections.length,
            allElections
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).send('Error in getting all election');
    }
}


        