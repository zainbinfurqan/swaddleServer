const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
    role: {
        type:String,
        required:true
    },
    userId: {
        type: ObjectId,
        required: true
    }
}, { runSettersOnQuery: true });
module.exports = mongoose.model('loginSchema', loginSchema);
