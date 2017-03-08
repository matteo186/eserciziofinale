var express = require('express');
var app = express();
var path = require('path');
var bodyparser = require ('body-parser');
const port = 3000;

//

app.use(bodyparser.json());

//servo la index.html
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

//servire gli utenti
var utenti = require('./utenti/utenti.js');
app.use('/users',utenti);


app.listen(port, function() {
    console.log('server start at http://localhost:' + port);
});
