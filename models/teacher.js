const mongoose = require('mongoose');


const TeacherSchema = mongoose.Schema({ 
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    

},{timestamps:true})  

const Blog = mongoose.model('teacher', TeacherSchema)
module.exports = UserModel   