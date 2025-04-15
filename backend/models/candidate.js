const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    party: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Party',
        // required: true
    },
    participatedElections: [{    
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Election',
            // default:[]
    }]


}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);