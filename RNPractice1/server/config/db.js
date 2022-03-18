const mysql = require('mysql');
 
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '1007',
    database: 'RNTest'
});
 
module.exports = db;
