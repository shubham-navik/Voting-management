const Election = require('../models/election');
const Party = require('../models/party');


exports.createElection = async (req, res) => {
    const {electionId, title, description,  start, end } = req.body;
    
    try {
        let election = await Election.findById(electionId);
        if (election) {
            return res.status(400).json({ msg: "Election already exists with this Id: " + electionId });
        }

        // const InvalidParties = parties.map(async (party) => {
        //     if (!await Party.findById(party)) {
        //         return party;
        //     }
        // }
        // );

        // if (InvalidParties.length > 0) {
        //     return res.status(400).json({ msg: "Parties does not exist\nEnter valid party Ids." });
        // }

        election = new Election({
            electionId,
            title,
            description,
            parties,
            startDate: start,
            endDate: end
        });

        await election.save();
        res.send('Election created successfully with Id: ' + electionId);
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send('Error in creating election');
    }
}


        