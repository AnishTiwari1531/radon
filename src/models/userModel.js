const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    firstName: {
        type : String,
        required : true
    },
    lastName: String,
    mobile: {
        type: String,

        required: true
    },
    emailId: String,
    password: String,
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    age: Number,
    isDeleted:{ 
        type : Boolean,
        default:false
    },
    posts: {
        type: [], 
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)