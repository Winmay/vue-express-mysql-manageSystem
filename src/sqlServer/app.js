var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var router = require('./router');

var port = process.env.PORT || 9999;
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
    secret: 'fuckupig',
    cookie: {maxAge: 3600000},
    resave: true,
    saveUninitialized: true,
}));

app.use(router);

app.listen(port, () => {
    console.log(`devServer start on port:${ port}`);
});