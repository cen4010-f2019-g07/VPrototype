const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
var queryString, alerts;

var pool = mysql.createPool({
	connectionLimit: 100,
	host: 'localhost',
	user: 'user',
	password: 'password',
	database: 'vprototype',
	multipleStatements: true
});

app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	let queries = [ 'SELECT * FROM issues', 'SELECT * FROM users', 
	'SELECT * FROM events', 'SELECT * FROM garages'];
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
	queryString = req.body.mysql_query.replace(/\s+/g, '').split(":");
	console.log(queryString[0]);
	let issues;
	let events;
	let users;
	let garages;
	switch(queryString[0]){
		case 'all':
			console.log('all switch code block');
			switch(queryString[1]){
				case 'all':
					console.log('all: all switch code block');
					pool.getConnection(function(error, connection){
						if(error) throw error;
						pool.query('SELECT * FROM issues', function(err, rows, fields){
							connection.release();
							if(err) throw err;
							console.log(rows);
							res.render('pages/index', {
								alerts: alerts,
								issues: issues,
								events: events,
								users: users,
								garages: garages
							});
						});
					});
					break;
				case 'issues':
					console.log('all: issues switch code block');
					break;
				case 'events':
					console.log('all: events switch code block');
					break;
				case 'users':
					console.log('all: users switch code block');
					break;
				case 'garages':
					console.log('all: garages switch code block');
					break;
				default:
					console.log('Bad Input!');
					alerts = 'Bad Input!';
					res.render('pages/index', {
						alerts: alerts,
						issues: issues,
						events: events,
						users: users,
						garages: garages
					});
			}
			break;
		case 'issues':
			console.log('issues switch code block');
			//Searching by description
			break;
		case 'events':
			console.log('events switch code block');
			switch(queryString[1]){
				case 'all':
					console.log('all: all switch code block');
					break;
				case 'issues':
					console.log('all: issues switch code block');
					break;
				case 'events':
					console.log('all: events switch code block');
					break;
				case 'users':
					console.log('all: users switch code block');
					break;
				case 'garages':
					console.log('all: garages switch code block');
					break;
			}
			break;
		case 'users':
			console.log('users switch code block');
			//search by email value
			break;
		case 'garages':
			console.log('garages switch code block');
			//search by name
			break;
		default:
			console.log('Bad Input!');
			alerts = 'Bad Query!';
			res.render('pages/index', {
				alerts: alerts,
				issues: issues,
				events: events,
				users: users,
				garages: garages
			});
	}
});

app.listen(3000, () => console.log('Listening on port 3000...'));

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
	connection.query('SET SESSION auto_increment_incrment=1');
});