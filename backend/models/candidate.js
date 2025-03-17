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
        required: true
    },
    participatedElections: [{
        elections: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Election'
        },
        resultStatus: {
            type: String,
            default: 'pending'
        }
    }]


});

module.exports = mongoose.model('Candidate', candidateSchema);