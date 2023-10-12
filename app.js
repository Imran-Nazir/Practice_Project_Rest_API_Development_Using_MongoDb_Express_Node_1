const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const bodyParser = require('body-parser');

//Security Middleware import
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

//Database lib import
const mongoose = require('mongoose');

//security middleware implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

//body-parser implement
app.use(bodyParser.json());

//request rate limit
const limiter = rateLimit({
    windowMs: 15*60*1000,
    max: 100
});
app.use(limiter);

//mongodb database connection
let URI = "mongodb://127.0.0.1:27017/ToDo";
let option = {user:'', pass:'', autoIndex:true};
mongoose.connect(URI, option).then(()=>{
    console.log("Successfully connected to database");
}).catch((err)=>{console.error("Error connecting to database",err);})

//routing implement
app.use('/api/v2', router)

//undefined route
app.use("*", (req, res)=>{
    res.status(404).json({status:"Failed", data:"Not Found!"});
})

//exports module
module.exports = app;