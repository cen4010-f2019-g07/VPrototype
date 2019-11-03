const mysql = require('mysql');

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

var createIssue1 = "INSERT INTO issues(description, location) VALUE(\'The toilet is clogged\', \
\'In Parliament 1st Floor Bathroom\')";
var createIssue2 = "INSERT INTO issues(description, location, verified) VALUE(\
\'The leftmost elevator cab is not working\', \'IVAS Lobby\', true)";
var createIssue3 = "INSERT INTO issues(description, location, verified, resolved) \
VALUE(\'TV in IVAN Lobby displaying Error\', \'IVAN Lobby\', true, true)";

var createEvent1 = "INSERT INTO events(location, start_date, end_date, description, host) \
VAULE(\'Palmetto Oaks Room\', ";
var createEvent2 = "INSERT INTO events()";

var createUser1;
var createUser2;

var createGarage1;
var createGarage2;

connection.query(createIssue1, function(err, rows, fields){
	if(err) throw err;
	console.log("Issue Record 1 has been Created!");
});

connection.query(createIssue2, function(err, rows, fields){
	if(err) throw err;
	console.log("Issue Record 2 has been Created!");
});

connection.query(createIssue3, function(err, rows, fields){
	if(err) throw err;
	console.log("Issue Record 3 has been Created!");
});

connection.end();

return;