const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser=require('body-parser');
const mysql = require('mysql');
require('dotenv').config();
const cors = require('cors');

const app = express(); 
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'));



//template engine .hbs
app.engine('hbs', exphbs( {extname:'.hbs'}));
app.set('view engine' , 'hbs');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

pool.getConnection((err, Connection) => {
    if(err) throw err;
    console.log('Connected to database!');
});

const routes = require('./server/routes/user');
app.use('/', routes);

app.listen(port, () => {
    console.log(`Listening on Port ${port}`)
});
