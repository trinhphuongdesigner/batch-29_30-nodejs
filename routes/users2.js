var express = require('express');
var router = express.Router();

/* GET users listing. */

router.get('/res', function(req, res, next) {
  res.send('this is second');
});

router.get('/res', function(req, res, next) {
  res.send('this is first');
});

router.post('/res', function(req, res, next) {
  res.send('this is Post method');
});

router.put('/res', function(req, res, next) {
  res.send('this is put method');
});

router.delete('/res', function(req, res, next) {
  res.send('this is delete method');
});

router.patch('/res', function(req, res, next) {
  res.send('this is patch method');
});

module.exports = router;
