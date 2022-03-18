const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Router } = require('express');

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1007',
    database : 'RNTest'
});

db.connect();

app.use('register', require("./user.register"));
app.use('login', require("./user.login"));

app.listen(3000, ()=>{
    console.log('Server aktif di port ')
});