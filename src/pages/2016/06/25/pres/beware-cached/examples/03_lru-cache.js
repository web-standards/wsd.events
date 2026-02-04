var express = require('express');
var app = express();
var fetch = require('./fetch');
var calculate = require('./calculate');
var LRU = require('lru-cache');
var cache = LRU({ maxAge: 3000 });

app.get('/', (req, res) => {
    if (!cache.has('coffee')) {
        var data = fetch().then(calculate);
        cache.set('coffee', data);
    }

    cache.get('coffee')
        .then(data => res.json(data))
        .catch(() => cache.del('coffee'));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
