const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
var queryString;

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'user',
	password: 'password',
	database: 'vprototype'
});

function connectDB() {
		connection.connect((err) => {
		if(err) throw err;
		console.log('Connected!');
	});
}

function endDBConnect(){
	connection.end();
}

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
	connectDB();
	res.render('index')
	endDBConnect();
});

app.post('/', (req, res) => {
	queryString = req.body.mysql_query;
	console.log(queryString);
	connectDB();
	connection.query(queryString, function(err, rows, fields) {
		if (err) throw err;
		for (var i in rows){
			console.log('Post Titles: ', rows[i].post_title);
		}
	});
	endDBConnect();
	res.render('index');
})

app.listen(3000, () => console.log('Listening on port 3000...'));