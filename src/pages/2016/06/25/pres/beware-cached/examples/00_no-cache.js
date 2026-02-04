var express = require('express');
var app = express();
var fetch = require('./fetch');
var calculate = require('./calculate');

app.get('/', (req, res) => {
    fetch()
        .then(calculate)
        .then(data => res.json(data));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
