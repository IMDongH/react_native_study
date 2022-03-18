const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Router } = require('express');
const router = express.Router();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1007',
    database : 'RNTest'
});

db.connect();

app.get('/', function(req,res){
    var sql = 'SELECT * FROM RNTest';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
    });
    
    
app.use('register', require("./user.register"));
app.use('login', require("./user.login"));

app.listen(3000, ()=>{
    console.log('Server aktif di port ')
});