const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
    electionId: {
        type: String,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Party'
    }],
    contestants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Contestant'
    }],
    voters: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voter'  // Properly referencing Voters
    }],
    startDate: {
        type: Date,
        required:true //Must be explicitly provided
    },
    endDate: {
        type: Date,
        required: true  // Must be explicitly provided
    },
    status: {
        type: String,
        enum: ["upcoming", "ongoing", "completed"],  // Restricts possible values
        default: "upcoming"
    }
}, { timestamps: true });

module.exports = mongoose.model("Election", electionSchema);
