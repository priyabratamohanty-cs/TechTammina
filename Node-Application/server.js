//install and require predefined NPM modules

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

//require custome modules created by own
const dbDetails = require('./config/dbConfig');

//default port
const port = 3000;

//create the express root object
let app = express();

//predefined middleware 
app.use(bodyParser.json()); //for reading data from Body of POST method
app.use(cors()); // for cross origin port access

//connect to mongodb using mongoose
mongoose.connect(dbDetails.dbUrl,
    { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
        if (err) {
            console.log('error occured while connecting to the mongodb');
        } else {
            console.log('mongodb connected successfully');
        }
    })

//require routes modules
app.use('/techtamina', require('./routes/user'));
app.use('/techtamina', require('./routes/batch'));

//listen the server in a particular port
app.listen(port, (err) => {
    if (err) {
        console.log('Error occured while listening in port no' + port);
        console.log(err);
    } else {
        console.log('Server is running in port no ' + port);
    }
})