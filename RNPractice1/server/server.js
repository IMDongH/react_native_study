const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const db = require('./config/db');

app.get('/api/products', (req, res) => {
    db.query("SELECT * FROM RNTest", (err, data) => {
        if(!err) res.send({ DATA : data });
        else res.send(err);
    })
})

app.listen(PORT, () => {
    console.log(`Server On : http://localhost:${PORT}/`);
})