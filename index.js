const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
var queryString;

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'user',
	password: 'password',
	database: 'vprototype'
});

connection.connect((err) => {
	if(err) throw err;
	console.log('Connected!');
});

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	var issues = [];
	var events = [];
	var users = [];
	var garages = [];
	connection.query('SELECT * FROM issues', function(err, rows, fields) {
		if(err) throw err;
		for (var i in rows){
			issues[i] = rows[i].post_title;
		}
	});
	connection.query('SELECT * FROM events', function(err, rows, fields) {
		if(err) throw err;
		for (var i in rows){
			events[i] = rows[i].post_title;
		}
	});
	connection.query('SELECT * FROM users', function(err, rows, fields) {
		if(err) throw err;
		for (var i in rows){
			users[i] = rows[i].post_title;
		}
	});
	connection.query('SELECT * FROM garages', function(err, rows, fields) {
		if(err) throw err;
		for (var i in rows){
			garages[i] = rows[i].post_title;
		}
	});
	res.render('pages/index', {
		issues: issues,
		events: events,
		users: users,
		garages: garages
	});
});

app.post('/', (req, res) => {
	queryString = req.body.mysql_query;
	console.log(queryString);
	connection.query(queryString, function(err, rows, fields) {
		if (err) {
			console.log('Bad Input!');
		}
		for (var i in rows){
			console.log('Post Titles: ', rows[i].post_title);
		}
	});
	var issues = [];
	var events = [];
	var users = [];
	var garages = [];
	connection.query('SELECT * FROM issues', function(err, rows, fields) {
		if(err) throw err;
		for (var i in rows){
			issues[i] = rows[i].post_title;
		}
	});
	connection.query('SELECT * FROM events', function(err, rows, fields) {
		if(err) throw err;
		for (var i in rows){
			events[i] = rows[i].post_title;
		}
	});
	connection.query('SELECT * FROM users', function(err, rows, fields) {
		if(err) throw err;
		for (var i in rows){
			users[i] = rows[i].post_title;
		}
	});
	connection.query('SELECT * FROM garages', function(err, rows, fields) {
		if(err) throw err;
		for (var i in rows){
			garages[i] = rows[i].post_title;
		}
	});
	res.render('pages/index', {
		issues: issues,
		events: events,
		users: users,
		garages: garages
	});
})

app.listen(3000, () => console.log('Listening on port 3000...'));

connection.on('close', function(err){
	if (err) {
		//Oops! Unexpected closing of connection, lets reconnect back.
		connection = mysql.createConnection(connection.config);
	}
	else{
		console.log('Connection closed normally.');
	}
});