const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: email,
        required: true,
        unique: true
    },
    password: {
        type: string,
        required: true,
    },
    govId: {
        type: string,
    },
    
});

module.exports = mongoose.model('Voter', voterSchema);