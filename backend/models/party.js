const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    slogan: {  // Fixed from `slogon` to `slogan`
        type: String,
        required: true,
        unique: true
    },
    partyId: {
        type: Number,
        required: true,
        unique: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    }
}, { timestamps: true });

module.exports = mongoose.model('Party', partySchema);
