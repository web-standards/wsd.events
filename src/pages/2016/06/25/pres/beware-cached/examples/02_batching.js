var express = require('express');
var app = express();
var fetch = require('./fetch');
var calculate = require('./calculate');

var cache;

app.get('/', (req, res) => {
    cache = cache || fetch().then(calculate);

    cache
        .then(data => res.json(data))
        .catch(() => cache = null);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
