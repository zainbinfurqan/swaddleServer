const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    profilePic:{
        type:Object,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    isDelete: {
        type: Boolean,
        default: false
    }
}, { runSettersOnQuery: true });
module.exports = mongoose.model('userSchema', userSchema);
