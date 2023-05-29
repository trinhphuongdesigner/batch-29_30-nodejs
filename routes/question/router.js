const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../utils');
const {
  q1,
} = require('./validations');
const {
  question1,
  question1a,
  question1b,
  question2a,
  question2b,
  // question3,
} = require('./controller');

router.get('/1', question1);
router.get('/1a', validateSchema(q1), question1a);
router.get('/1b', question1b);
router.get('/2a', question2a);
router.get('/2b', question2b);
// router.get('/3', question3);

module.exports = router;
