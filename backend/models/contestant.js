const mongoose = require('mongoose');

// const candidate = require('./candidate');

const contestantSchema = new mongoose.Schema({
    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Election'
    },
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Candidate'
    },
    votes: {
        type: Number,
        default: 0
    }

    
});

module.exports = mongoose.model('Contestant', contestantSchema);