const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            lowercase: true
        }
    },
);

module.exports = mongoose.model('User', userSchema);