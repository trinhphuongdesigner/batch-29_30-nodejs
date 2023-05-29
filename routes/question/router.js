const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../utils');
const {
  q1,
} = require('./validations');
const {
  q1,
  q1a,
} = require('./controller');

router.get('/1', q1);
router.get('/1', validateSchema(q1), q1a);

module.exports = router;
