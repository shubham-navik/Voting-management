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
      // Find election by electionId
      const election = await Election.findOne({ electionId });
  
      if (!election) {
        return res.status(404).json({ msg: `Election not found with Id: ${electionId}` });
      }
  
      // Optional: Check that start and end are valid dates
      const startDate = new Date(start);
      const endDate = new Date(end);
  
      if (isNaN(startDate) || isNaN(endDate)) {
        return res.status(400).json({ msg: "Invalid date format for start or end" });
      }
  
      if (startDate >= endDate) {
        return res.status(400).json({ msg: "Start date must be before end date" });
      }
  
      // Update fields
      election.title = title || election.title;
      election.description = description || election.description;
      election.startDate = startDate;
      election.endDate = endDate;
  
      await election.save();
  
      res.json({ msg: "Election updated successfully", election });
    } catch (err) {
      console.error("Error updating election:", err.message);
      res.status(500).json({ msg: "Server error while updating election" });
    }
  };
  

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




        