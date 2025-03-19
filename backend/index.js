
const express = require('express');
const app = express();
app.use(express.json());//to parse json data
require('dotenv').config();//to use .env file
require('./utils/updateElectionStatus');
//to schedule the election

//import routes
const candidateRouter = require('./routes/candidateRoute');
const adminRouter = require('./routes/adminRoute');
const voterRouter = require('./routes/voterRoute');

//public routes
const publicRouter = require('./routes/publicRoute');


//api routes
app.use('/api/candidate', candidateRouter);
app.use('/api/admin', adminRouter);
app.use('/api/public', publicRouter);
app.use('/api/voter', voterRouter);


//import db funtion
const connectDB =require('./database/db');
connectDB();//dtabase connection

const port = process.env.PORT || 3000;
app.listen(port, (req, res) => {
    console.log('Server is running at port ' + `${port}`);
})