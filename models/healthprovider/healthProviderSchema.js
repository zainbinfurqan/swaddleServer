const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

const healthProviderSchema = new mongoose.Schema({
    healthProviderName: {
        type: String,
        required:true
    },
    isDelete: {
        type: Boolean,
        default: false,
    },
}, { runSettersOnQuery: true });
module.exports = mongoose.model('healthProviderSchema', healthProviderSchema);
