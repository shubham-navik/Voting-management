const Party = require('../models/party');
const Candidate = require('../models/candidate')


// create party
exports.createParty = async (req, res) => {
    const { name, slogan, partyId } = req.body;
    const candidate = req.candidate.id;
    try {
        let isParty = await Party.findOne({ partyId: partyId });
        const candi = await Candidate.findById(candidate);
        if (!candi) {
            return res.status(404).json({
                msg: "candidate Not found",
                candidate
            })
        }
        if (isParty) {
            return res.status(404).json({
                msg: "Party  found",
                isParty,
                candidate
            });
        }
        //create new object of party
        const party = new Party({
            name,
            slogan,
            partyId,
            createdBy:candidate
        })


        candi.party = party._id;
        await candi.save();
        console.log(party);
        //save the party
        await party.save();
        res.status(200).json({
            msg: "party created succesfull",
            party
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "err in create Party"
        })
    }

}