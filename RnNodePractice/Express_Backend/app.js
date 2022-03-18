const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '1007',
    database : 'RNTest'
});

db.connect();

app.get('/data', function(req,res){
var sql = 'SELECT * FROM RNTest';
db.query(sql, (err, result)=>{
    if(err) throw err;
    console.log(result);
    
    res.send(result);
});
});

app.post('/data', function(req, res){
	console.log(req.body); 
    var data = {nama:req.body.nama, usia:req.body.usia};
    var sql = 'INSERT INTO RNTest SET ?';
    db.query(sql, data, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send({
        status: 'Data sukses diinput!',
        no: null,
		nama: req.body.nama,
		usia: req.body.usia
	});
});
});

app.listen(3000, ()=>{
    console.log('Server aktif di port 3000')
});