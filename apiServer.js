var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// APIs
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/bookshop');

var db= mongoose.connection;
db.on('error', console.error.bind(console, "# MongoDB error"))

// --> SET UP SESSION -- //
app.use(session({
	secret: 'mysecretString',
	saveUnitialized: false,
	resave: false,
	cookie: {maxAge: 1000*60*60*24*2},
	store: new MongoStore({mongooseConnection: db, ttl: 2*24*60*60})
}))

app.post('/cart', function(req, res){
	var cart = req.body;
	req.session.cart = cart;
	req.session.save(function(err){
		if (err){
			throw err;
		}

		res.json(req.session.cart);
	})
})

app.get('/cart', function(req, res){
	if(typeof req.session.cart !== 'undefined'){
		res.json(req.session.cart);
	}
});

var Items = require('./models/items.js');

app.post('/items', function(req, res){
	var item = req.body;

	Items.create(item, function(err, items){
		if(err){
			throw err;
		}
		res.json(items);
	});
});

app.get('/items', function(req, res){
	Items.find(function(err, items){
		if(err){
			throw err;
		}
		res.json(items);
	});
})

app.delete('/items/:_id', function(req, res){
	var query = {_id: req.params._id};

	Items.remove(query, function(err, items){
		if(err){
			throw err;
		}
		res.json(items);
	});
})
// END APIs

app.listen(3001, function(err){
	if(err){
		return console.log(err);
	}
	console.log('api is working');
});

module.exports = app;
