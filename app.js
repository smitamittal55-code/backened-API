const express = require("express")
const app = express()  //method 
const web = require('./routes/web')
const connectDB = require('./db/connectDB')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')


dotenv.config()

//cookie parser
app.use(cookieParser())  //token get cookie postman ya react


//data get postman react
app.use(express.json());

//connectdb
connectDB();

//data get json postman ya react
app.use(express.json())




//router load localhost:3000/api
app.use('/api',web)




//server start
app.listen(process.env.PORT, () => {
    console.log(`Server start localhost:${process.env.PORT}`);
})
