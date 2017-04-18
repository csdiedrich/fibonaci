var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.query.fibonum) {
    var httpreq = require('http').request({
      method: 'GET', host: "localhost", port: 3333,
      path: "/fibonacci/"+Math.floor(req.query.fibonum)
    }, function(httpresp) {
      httpresp.on('data', function(chunk) {
        var data = JSON.parse(chunk);
        res.render('index', {
          title: "Fibonacci Calculator",
          fibonum: req.query.fibonum, fiboval: data.result
        });
      });
      httpresp.on('error', function(err) { next(err); });
    });
    httpreq.on('error', function(err) { next(err); });
    httpreq.end();
  } else {
    res.render('index', {
      title: "Fibonacci Calculator", fiboval: undefined
    });
  }
});

module.exports = router;
// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;


// var express = require('express');
// var router = express.Router();
// var math = require('../math');
// router.get('/', function(req, res, next) {
//   if (req.query.fibonum) {
//     res.render('index', {
//       title: "Fibonacci Calculator",
//       fibonum: req.query.fibonum,
//       fiboval: math.fibonacci(req.query.fibonum)
//     });
//   } else {
//     res.render('index', {
//       title: "Fibonacci Calculator", fiboval: undefined
//     });
//   }
// });
// module.exports = router;