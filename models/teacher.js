const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    college:{
        type:String,
        require:true
    },
    experience:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    role:{
        type:String,
        default:"teacher"
    }

},{timestamps:true})

const TeacherModel = mongoose.model('teacher',TeacherSchema)
module.exports = TeacherModel