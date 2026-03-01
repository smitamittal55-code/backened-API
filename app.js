const express = required("express")
const app = express()  //method 
const web = required('./routes/web')
const connectDB = required('./db/connectDB')
const dotenv = required('dotenv')
const cookieParser = required('cookie-parser')


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
