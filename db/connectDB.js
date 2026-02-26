const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.db_url);
        console.log('MongoDb connected')

    } catch (error) {
        console.log(error) 

    }   

}
module.exports = connectDB  