const mysql = require('mysql');
const faker = require('faker');

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
VALUE(\'Palmetto Oaks Room\', \'2019-11-01 18:00:00\', \'2019-11-01 19:30:00\', \'Social with free food\', \'Cool Socials\')";
var createEvent2 = "INSERT INTO events(location, start_date, end_date, description, host) \
VALUE(\'Live Oak Room\', \'2019-11-04 15:00:00\', \'2019-11-04 16:00:00\', \'Informal Resume Review\', \'Resume Reviews\')";

var createUser1 = "INSERT INTO users(residency, commuter, phone_number, address, email, \
firstname, lastname) VALUE(\'In-State\', true, \'(987) 123-4567\', \'70 Glades Road, Boca \
Raton, FL 33302\', \'studentemail1@fau.edu\', \'John\', \'Doe\')";
var createUser2 = "INSERT INTO users(residency, dormer, phone_number, address, email, \
firstname, lastname) VALUE(\'Out-State\', true, \'(123) 456-7890\', \'Parliament Room 316, \
Boca Raton, FL 33302\', \'studentemail2@fau.edu\', \'Jane\', \'Smith\')";

var createGarage1 = "INSERT INTO garages(location, name, free_spots, total_spots) \
VALUE(\'60 University Road, Boca Raton, FL 33302\', \'Garage 1\', 400, 400)";
var createGarage2 = "INSERT INTO garages(location, name, free_spots, total_spots) \
VALUE(\'40 Lucia Ave, Boca Raton, FL 33303\', \'Garage 2\', 400, 400)";

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

connection.query(createEvent1, function(err, rows, fields){
	if(err) throw err;
	console.log("Event Record 1 has been Created!");
});

connection.query(createEvent2, function(err, rows, fields){
	if(err) throw err;
	console.log("Event Record 2 has been Created!");
});

connection.query(createUser1, function(err, rows, fields){
	if(err) throw err;
	console.log("User Record 1 has been Created!");
});

connection.query(createUser2, function(err, rows, fields){
	if(err) throw err;
	console.log("User Record 2 has been Created!");
});

connection.query(createGarage1, function(err, rows, fields){
	if(err) throw err;
	console.log("Garage Record 1 has been Created!");
});

connection.query(createGarage2, function(err, rows, fields){
	if(err) throw err;
	console.log("Garage Record 2 has been Created!");
});

connection.end();

return;