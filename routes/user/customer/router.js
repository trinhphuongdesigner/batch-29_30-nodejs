const express = require('express');
const router = express.Router();
const passport = require('passport');

const { validateSchema } = require('../../../utils');
const {
  getDetailSchema,
  createSchema,
} = require('./validations');
const {
  getAll,
  getDetail,
  create,
  removeMe,
  updateMe,
} = require('./controller');

router.route('/register')
  .post(validateSchema(createSchema), create)

// router.route('/profile')
//   // .post(validateSchema(createSchema), passport.authenticate('jwtUser', { session: false }), getMe)
//   .patch(validateSchema(createSchema), passport.authenticate('jwtUser', { session: false }), updateMe)
//   .delete(validateSchema(getDetailSchema), passport.authenticate('jwtUser', { session: false }), removeMe)

router.route('/:id')
  .get(validateSchema(getDetailSchema), getDetail)

module.exports = router;
