const express = require('express');
const passport = require('passport');
const router = express.Router();

const { validateSchema } = require('../../utils');
const {
  loginSchema,
  getDetailSchema,
  createSchema,
  editSchema,
} = require('./validations');
const {
  login,
  getMe,
  getAll,
  getDetail,
  create,
  remove,
  update,
} = require('./controller');

router.route('/login')
  .post(
    validateSchema(loginSchema),
    passport.authenticate('local', { session: false }),
    login,
    )

router.route('/profile')
  .get(passport.authenticate('jwt', { session: false }), getMe, )

router.route('/')
  .get(getAll)
  .post(validateSchema(createSchema), create)

router.route('/:id')
  .get(validateSchema(getDetailSchema), getDetail)
  .patch(validateSchema(editSchema), update)
  .delete(validateSchema(getDetailSchema), remove)

module.exports = router;
