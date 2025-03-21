const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
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
        required: true,
    },
    govId: {
        type: String,
    },
    
});

module.exports = mongoose.model('Voter', voterSchema);