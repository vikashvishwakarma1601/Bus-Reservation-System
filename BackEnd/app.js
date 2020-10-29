var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var auth= require('./routes/auth')
var bus= require('./routes/bus')

var app = express();

mongoose.connect('mongodb://127.0.0.1:27017/Users', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(error => {
        console.log(error)
    });


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', usersRouter);
app.use('/api',auth);
app.use('/api',bus);
module.exports = app;
