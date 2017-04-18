var math = require('./math');
var express = require('express');
var logger = require('morgan');
var util   = require('util');
var app = express();
app.use(logger('dev'));
app.get('/fibonacci/:n', function(req, res, next) {
    math.fibonacciAsync(Math.floor(req.params.n),
    function(err, val) {
        if (err) next('FIBO SERVER ERROR ' + err);
        else {
            util.log(req.params.n +': '+ val);
            res.send({ n: req.params.n, result: val });
        }
    });
});

app.listen(3000);
