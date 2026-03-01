const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    college:{
        type:String,
        required:true
    },
    experience:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"teacher"
    }

},{timestamps:true})

const TeacherModel = mongoose.model('teacher',TeacherSchema)
module.exports = TeacherModel