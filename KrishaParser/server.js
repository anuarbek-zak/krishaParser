var compression = require('compression');
var express = require('express');
var path = require('path');
var session = require('express-session');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var User  = require('./server/models/User');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if(env === 'development'){
	mongoose.connect('mongodb://127.0.0.1:27017/test');
}else {
	mongoose.connect('mongodb://Anuarbek:14nur97@ds157248.mlab.com:57248/mydb');
}

var app = express();

// Middlewares

//Compress our responses
app.use(compression());
app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public'), { maxAge: 3600000 }));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));

app.use(session({ secret: 'your secret here',
	resave:  true,
	saveUninitialized: true,
	key: 'some key',
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());

var auth = require('./server/routes/auth');
var routes = require('./server/routes/routes');
app.use('/',routes);
app.use('/auth',auth);


// Use of Passport user after login
app.use(function(req, res, next) {
	if (req.user) {
		res.cookie('user', JSON.stringify(req.user));
	}
	next();
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.send(500, { message: err.message });
});

// Start server
app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
