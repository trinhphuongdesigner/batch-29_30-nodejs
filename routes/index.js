var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Welcome to Express' });
// });

// router.get('/send', async (req, res, next) => {
//   res.send({ message: 'Hello' });
// });

// router.get('/sendStatus', async (req, res, next) => {
//   res.sendStatus(404);
// });

// Thường dùng
// router.get('/setStatus', async (req, res, next) => {
//   res.status(201).json({ message: 'Hello' });
// });

router.get('/sendFile', async (req, res, next) => {
  res.sendFile('/public/stylesheets/style.css', { root: './' });
});

// Thường dùng (status = 200)
router.get('/json', async (req, res, next) => {
  res.json({ message: 'Hello Redirect' });
});

router.get('/redirect', async (req, res, next) => {
  res.redirect('/json');
});

module.exports = router;
