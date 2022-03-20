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
var sql = 'SELECT * FROM RNTest';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log("RESULT",result);
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
      
      app.get('/', function (req, res) {
        let body = req.query;
        console.log("body",body)
        if(!body.userEmail){
            console.log("student")
            res.status(500).send({
                message: "student id is null"
            });
            return;
        }
    
        // let result = await findOne({
        //     where: {
        //         userEmail: body.userEmail
        //     }
        // });
    
        // let dbPassword = result.dataValues.userPassword;
        let inputPassword = body.userPassword;
    
        if (inputPassword) {
            console.log("SUCCESS")
            res.send({
                message: "Login success",
                status:'success',
                data:{
                    userEmail:body.userEmail
                }
            });
        }
        else {
            res.status(500).send({
                message: "Wrong Password"
            });
        }
    })

app.listen(4000, ()=>{
    console.log('Server aktif di port ')
});