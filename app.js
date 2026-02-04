const express = require("express")
const app = express()  //method
const port = 3000
const web = require('./routes/web')



//router load localhost:3000/api
app.use('/api',web)



//server create https://localhost:4000 req(/)
app.listen(port,console.log("server start localhost:3000"))
