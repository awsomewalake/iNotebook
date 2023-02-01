
const mongoose = require("mongoose")
const mongoURI = "mongodb://localhost:27017/inotebook"
const connect_to_mongo = async ()=>{
    mongoose.connect(mongoURI, ()=>{console.log("Connected to mongo Succesfully")})
}

module.exports = connect_to_mongo;
