const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({
    Firstname: {type: String},
    Lastname: {type: String},
    Email: {type: String},
    MobileNumber: {type: String},
    City: {type:String},
    Username: {type: String, unique: true},
    Password: {type: String},
}, {versionKey: false})
const ProfileModel = mongoose.model('profiles', DataSchema);

module.exports = ProfileModel;