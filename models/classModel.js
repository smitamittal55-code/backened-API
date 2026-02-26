const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema({
    course: {
        type: String,   
        require: true
    },
    semester: {
        type: String,
        require: true  
    },
   
}, { timestamps: true })

const ClassModel = mongoose.model('class', ClassSchema)
module.exports = ClassModel