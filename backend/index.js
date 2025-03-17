
const express = require('express');
const app = express();
app.use(express.json());//
require('dotenv').config();//to use .env file

//import
const connectDB =require('./database/db');

//connect to database
connectDB();//dtabase connection

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Server is running at port ' + `${port}`);
})