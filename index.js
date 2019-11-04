"use strict";
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const http = require('http');
const port = 14050;

const app = express();
var alerts;

var pool = mysql.createPool({
	connectionLimit: 100,
	host: 'localhost',
	user: 'cen4010fal19_g07',
	password: 'kJDrofNeU6',
	database: 'cen4010fal19_g07',
	multipleStatements: true
});

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

http.createServer(app, function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end("Hello Node.js\n");
}).listen(14125);

console.log("Server running on port 14125");

app.get('/', (req, res) => {
	var queries = [ 'SELECT * FROM issues', 'SELECT * FROM events', 
	'SELECT * FROM users', 'SELECT * FROM garages'];
	pool.getConnection(function(error, connection){
		if(error) throw error;
		pool.query(queries.join(';'), function(err, rows, fields){
			connection.release();
			if(err) throw err;
			res.render('pages/index', {
				issues: rows[0],
				events: rows[1],
				users: rows[2],
				garages: rows[3]
			});
		});
	});
});

app.post('/', (req, res) => {
	var submitQuery = req.body.mysql_query.replace(/\s+/g, '').split(":");
	console.log(submitQuery[0]);
	var queryString;
	var all = true;
	switch(submitQuery[0]){
		case 'all':
			console.log('all switch code block');
			switch(submitQuery[1]){
				case 'all':
					console.log('all: all switch code block');
					queryString = ['SELECT * FROM issues', 'SELECT * FROM events',
					'SELECT * FROM users', 'SELECT * FROM garages'];
					break;
				case 'issues':
					console.log('all: issues switch code block');
					queryString = ['SELECT * FROM issues', 'SELECT * FROM events WHERE event_number = -1',
					 'SELECT * FROM users WHERE user_number = -1', 'SELECT * FROM garages WHERE garage_number = -1'];
					break;
				case 'events':
					console.log('all: events switch code block');
					queryString = ['SELECT * FROM issues WHERE issue_number = -1',
					 'SELECT * FROM events', 'SELECT * FROM users WHERE user_number = -1',
					  'SELECT * FROM garages WHERE garage_number = -1'];
					break;
				case 'users':
					console.log('all: users switch code block');
					queryString = ['SELECT * FROM issues WHERE issue_number = -1',
					 'SELECT * FROM events WHERE event_number = -1', 'SELECT * FROM users', 
					 'SELECT * FROM garages WHERE garage_number = -1'];
					break;
				case 'garages':
					console.log('all: garages switch code block');
					queryString = ['SELECT * FROM issues WHERE issue_number = -1', 
					'SELECT * FROM events WHERE event_number = -1', 
					'SELECT * FROM users WHERE user_number = -1', 'SELECT * FROM garages'];
					break;
				default:
					console.log('Bad Input!');
					alerts = 'Bad Input!';
					queryString = ['SELECT * FROM issues WHERE issue_number = -1', 
					'SELECT * FROM events WHERE event_number = -1', 
					'SELECT * FROM users WHERE user_number = -1', 
					'SELECT * FROM garages WHERE garage_number = -1'];
			}
			break;
		case 'issues':
			console.log('issues switch code block');
			//Searching by description
			var issues = 'SELECT * FROM issues WHERE description LIKE \'%'.concat(submitQuery[1], '%\'');
			queryString = [issues, 'SELECT * FROM events WHERE event_number = -1', 
			'SELECT * FROM users WHERE user_number = -1', 'SELECT * FROM garages WHERE garage_number = -1'];
			break;
		case 'events':
			console.log('events switch code block');
			//Search by location
			var events = 'SELECT * FROM events WHERE location LIKE \'%'.concat(submitQuery[1], '%\'');
			queryString = ['SELECT * FROM issues WHERE issue_number = -1', events, 
			'SELECT * FROM users WHERE user_number = -1', 'SELECT * FROM garages WHERE garage_number = -1'];
			break;
		case 'users':
			console.log('users switch code block');
			//search by email value
			var users = 'SELECT * FROM users WHERE email LIKE \'%'.concat(submitQuery[1], '%\'');
			queryString = ['SELECT * FROM issues WHERE issue_number = -1', 
			'SELECT * FROM events WHERE event_number = -1', users, 
			'SELECT * FROM garages WHERE garage_number = -1'];
			break;
		case 'garages':
			console.log('garages switch code block');
			//search by name
			var garages = 'SELECT * FROM garages WHERE name LIKE \'%'.concat(submitQuery[1], '%\'');
			queryString = ['SELECT * FROM issues WHERE issue_number = -1', 
			'SELECT * FROM events WHERE event_number = -1', 
			'SELECT * FROM users WHERE user_number = -1', garages];
			break;
		default:
			console.log('Bad Input!');
			alerts = 'Bad Query!';
			queryString = ['SELECT * FROM issues WHERE issue_number = -1', 
			'SELECT * FROM events WHERE event_number = -1', 
			'SELECT * FROM users WHERE user_number = -1', 
			'SELECT * FROM garages WHERE garage_number = -1'];
	}
	console.log(queryString);
	pool.getConnection(function(error, connection){
		if(error) throw error;
		pool.query(queryString.join(';'), function(err, rows, fields){
			connection.release();
			if(err) throw err;
			res.render('pages/index', {
				alerts: alerts,
				issues: rows[0],
				events: rows[1],
				users: rows[2],
				garages: rows[3]
			});
		});
	});
});

//app.listen(port, () => console.log(`Listening on port ${port}...`));

pool.on('acquire', function(connection){
	console.log('Connection %d acquired', connection.threadId);
})

pool.on('release', function(connection){
	console.log('Connection %d released', connection.threadId);
});

pool.on('enqueue', function(){
	console.log('Waiting for available connection slot');
});

pool.on('connection', function(connection){
	connection.query('SET SESSION auto_increment_increment=1');
});