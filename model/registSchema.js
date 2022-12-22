const mod = require('../packages');
const mongoose = mod.mongoose;

const registerModel = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    pass : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Register', registerModel);