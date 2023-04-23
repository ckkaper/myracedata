const express = require('express');
const app = express(); 
const cors = require('cors');
const fs = require('fs');
const config = require('../config.json');

const port = 3000; 

app.use(cors({
    origin: '*'
}));

var data = fs.readFileSync('./scraper/results/chartData.json');

app.get('/data', (req, res) => {
    res.send(data);
});

app.listen(port, () => {
    console.log(`App listening on: http://localhost:${config.server.port}`);
});