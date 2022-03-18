const connection = mysql.createPool({
    host     : 'localhost', // Your connection adress (localhost).
    user     : 'root',     // Your database's username.
    password : '1007',        // Your database's password.
    database : 'RNTest'   // Your database's name.
  });
  
  // Starting our app.
  const app = express();
  
  // Creating a GET route that returns data from the 'users' table.
  app.get('/users', function (req, res) {
      // Connecting to the database.
      connection.getConnection(function (err, connection) {
  
      // Executing the MySQL query (select all data from the 'users' table).
      connection.query('SELECT * FROM RNTest', function (error, results, fields) {
        // If some error occurs, we throw an error.
        if (error) throw error;
  
        // Getting the 'response' from the database and sending it to our route. This is were the data is.
        res.send(results)
      });
    });
  });
  app.post('/users', function(req, res){
    console.log(req.body); 
      var data = {nama:req.body.nama, usia:req.body.usia};
      var sql = 'INSERT INTO RNTest SET ?';
      db.query(sql, data, (err, result)=>{
      if(err) throw err;
      console.log(result);
      res.send({  
      id: req.body.ID,
      pw: req.body.PW
    });
  });
  });

  // Starting our server.
  app.listen(3000, () => {
   console.log('Go to http://localhost:3000/users so you can see the data.');
  });