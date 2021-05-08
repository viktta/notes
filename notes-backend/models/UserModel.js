const mongoose = require('mongoose');

const UserModel = mongoose.Schema( {
    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', UserModel);