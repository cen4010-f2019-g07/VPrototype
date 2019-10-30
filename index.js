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

/*
function endDBConnect(){
	connection.end();
}
*/

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
	res.render('index');
});

app.post('/', (req, res) => {
	queryString = req.body.mysql_query;
	console.log(queryString);
	connection.query(queryString, function(err, rows, fields) {
		if (err) {
			console.log('Bad Input!');
			//throw err;
		}
		for (var i in rows){
			console.log('Post Titles: ', rows[i].post_title);
		}
	});
	res.render('index');
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

})