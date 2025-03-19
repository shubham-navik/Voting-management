const Election = require('../models/election');

//get all Elections
exports.getElections = async (req, res) => {
    try {
        const elections = await Election.find({});
        res.status(200).json({
            status: 'successfull fetched All Elections',
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