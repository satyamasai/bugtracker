// require("dotenv").config()
 const mongoose = require("mongoose")
const connection = mongoose.connect('mongodb+srv://satyam1516:161996@cluster0.zv5agkm.mongodb.net/bugtracker?retryWrites=true&w=majority')
module.exports={
    connection
}