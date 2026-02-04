var express = require('express');
var app = express();
var fetch = require('./fetch');
var calculate = require('./calculate');

var cache;

app.get('/', (req, res) => {
    if (cache) {
        return res.json(cache);
    }

    fetch()
        .then(calculate)
        .then(data => cache = data)
        .then(data => res.json(data));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
