const mongoose = require('mongoose');

const connectDB = async()=> {
    try{
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/backenedapi');
        console.log('MongoDb connected')
    } catch (error) {
        console.log('MongoDb Connection failed')
        console.log(error) 

    }   

}
module.exports = connectDB  