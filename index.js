const express = require('express');
const app = express();

const mysql = require('mysql');

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'user',
	password: 'password',
	database: 'vprototype'
});
connection.connect((err) => {
	if(err) throw err;
	console.log('Connected!');
});

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(3000, () => console.log('Listening on port 3000...'));

connection.end();