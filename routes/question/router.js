const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../utils');
const {
  q1,
} = require('./validations');
const {
  question1,
  question1a,
} = require('./controller');

router.get('/1', question1);
router.get('/1', validateSchema(q1), question1a);

module.exports = router;
