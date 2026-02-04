const express = require("express")
const app = express()  //method
const port = 3000
const web = require('./routes/web')
const connectDB = require('./db/connectDB')


//data get postman react
app.use(express.json());

//connectdb
connectDB()




//router load localhost:3000/api
app.use('/api',web)



//server create https://localhost:3000 req(/)
app.listen(port,console.log("server start localhost:3000"))
