var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer')
var crypto = require('crypto');
var fs = require('fs')
var passport = require('passport')
var baucis = require('baucis');

var cookieParser = require('cookie-parser');
var session    = require('express-session');
var MongoStore = require('connect-mongo')({session: session});

var secrets = require('./secrets')

var app = express();
var mongoose = require('mongoose')
mongoose.connect(secrets.db)

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', "http://localhost:8000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    if ('OPTIONS' == req.method) {
         res.send(200);
     } else {
         next();
     }
}

app.use(allowCrossDomain);
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(multer({ dest: './uploads/'}))

app.use(cookieParser());
app.use(session({
  store: new MongoStore({
    url: 'mongodb://localhost/snugglr2'
  }),
  secret: '1234567890QWERTY'
}));


var ApiRoutes = require('./routes/api')
ApiRoutes.init(app)

var UploadRoutes = require('./routes/uploads')
UploadRoutes.init(app)

var UserRoutes = require('./routes/user')
UserRoutes.init(app)

// var UploadRoutes = require('./routes/upload')
// UploadRoutes.init(app)

module.exports = app;
