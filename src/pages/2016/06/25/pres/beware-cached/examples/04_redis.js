var express = require('express');
var app = express();
var fetch = require('./fetch');
var calculate = require('./calculate');
var Redis = require('ioredis');
var cache = new Redis();

app.get('/', (req, res) => {
    cache.get('coffee')
        .then(data => {
            return data ? JSON.parse(data) : fetch()
                .then(calculate)
                .then(data => {
                    cache.set('coffee', JSON.stringify(data), 'EX', 3);
                    return data;
                })
                .catch(() => cache.del('coffee'));
        })
        .then(data => res.json(data));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
