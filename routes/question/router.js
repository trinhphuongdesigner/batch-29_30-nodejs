const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../utils');
const {
  q1,
} = require('./validations');
const {
  question1,
} = require('./controller');

router.get('/1', validateSchema(q1), question1);

module.exports = router;
