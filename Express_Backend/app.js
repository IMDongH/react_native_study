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
    
    
    app.post('/', function (req, res) {
        let body = req.body;
        console.log("body",body)
        if (!body.userEmail) {
          res.status(400).send({
            message: "Content can not be empty!"
          });
          return;
        }
   
        const userInfo = {
          userName: body.userName,
          userPassword: body.userPassword,
          userEmail: body.userEmail,
          userAge: body.userAge,
        }
        var sql = 'INSERT INTO RNTest SET ?';
      
        db.query(sql, userInfo, (err, result)=>{
          if(err) {throw err;
        console.log("error",err)}
          console.log("result",result);
          res.send({
              status:'success',
          });
      });
      });
app.use('login', require("./user.login"));

app.listen(4000, ()=>{
    console.log('Server aktif di port ')
});