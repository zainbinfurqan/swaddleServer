'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId;

var controlSettingSchema = new Schema({

    isUserDeactivated: {
        type: Boolean,
        default: false
    },
    isUserBlocked: {
        type: Boolean,
        default: false
    },
    userId: {
        type: ObjectId,
        required: true
    }
});

module.exports = mongoose.model('ControlSettingSchemas', controlSettingSchema);
