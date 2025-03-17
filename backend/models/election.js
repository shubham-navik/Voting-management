const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
    electionId: {
        type: string,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    parties: [{
        party: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Party'
        },

    }],

    candidates: [{
        candidate: {
            type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
        },
        votes: {
            type: Number,
            default: 0
        }
    }],
    voters: {
        type: Array,
        // required: true
        unique: true
    },
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now() + 1 * 6 * 60 * 60 * 1000),
    status: {
        type: String,
        default: 'pending'
    }
});

module.exports = mongoose.model('Election', electionSchema);