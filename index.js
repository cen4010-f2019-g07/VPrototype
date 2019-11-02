const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
var alerts;

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
	let queries = [ 'SELECT * FROM issues', 'SELECT * FROM events', 
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
	let submitQuery = req.body.mysql_query.replace(/\s+/g, '').split(":");
	console.log(submitQuery[0]);
	let queryString;
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
					queryString = ['SELECT * FROM issues', '', '', ''];
					break;
				case 'events':
					console.log('all: events switch code block');
					queryString = ['SELECT * FROM issues WHERE issue_number = -1',
					 'SELECT * FROM events', '', ''];
					break;
				case 'users':
					console.log('all: users switch code block');
					queryString = ['SELECT * FROM issues WHERE issue_number = -1',
					 'SELECT * FROM events WHERE event_number = -1', 'SELECT * FROM users', ''];
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
			}
			break;
		case 'issues':
			console.log('issues switch code block');
			//Searching by description
			let issues = 'SELECT * FROM issues WHERE description LIKE \'%'.concat(submitQuery[1], '%\'');
			queryString = [issues, '', '', ''];
			break;
		case 'events':
			console.log('events switch code block');
			//Search by location
			let events = 'SELECT * FROM events WHERE location LIKE \'%'.concat(submitQuery[1], '%\'');
			queryString = ['SELECT * FROM issues WHERE issue_number = -1', events, '', ''];
			break;
		case 'users':
			console.log('users switch code block');
			//search by email value
			let users = 'SELECT * FROM users WHERE email LIKE \'%'.concat(submitQuery[1], '%\'');
			queryString = ['SELECT * FROM issues WHERE issue_number = -1', 
			'SELECT * FROM events WHERE event_number = -1', users, ''];
			break;
		case 'garages':
			console.log('garages switch code block');
			//search by name
			let garages = 'SELECT * FROM garages WHERE name LIKE \'%'.concat(submitQuery[1], '%\'');
			queryString = ['SELECT * FROM issues WHERE issue_number = -1', 
			'SELECT * FROM events WHERE event_number = -1', 
			'SELECT * FROM users WHERE user_number = -1', garages];
			break;
		default:
			console.log('Bad Input!');
			alerts = 'Bad Query!';
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
	connection.query('SET SESSION auto_increment_increment=1');
});