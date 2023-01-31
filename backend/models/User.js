const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    email:{
        type : String,
        requried: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date : {
        type: Date,
        default: Date.now
    }
  });

module.exports = mongoose.model('user', userSchema);