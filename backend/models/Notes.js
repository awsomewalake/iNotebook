const mongoose = require('mongoose')
const {Schema} = mongoose;

const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    title: {
        type : String,
        required : true
    },
    description:{
        type : String,
        requried: true,
        unique: true
    },
    tag: {
        type: String,
        default: "general"
    },
    date : {
        type: Date,
        default: Date.now
    }
  });

module.exports = mongoose.model('notes', NotesSchema);