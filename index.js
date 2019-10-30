const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
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

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
	res.render('index')
});

app.post('/', (req, res) => {
	console.log(req.body.mysql_query);
	res.render('index');
})

app.listen(3000, () => console.log('Listening on port 3000...'));

connection.end();