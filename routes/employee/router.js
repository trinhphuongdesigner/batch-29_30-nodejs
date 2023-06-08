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

router.route('/login') // Đối tượng cần kiểm tra là tài khoản và mật khẩu gửi lên
  .post(
    validateSchema(loginSchema),
    passport.authenticate('local', { session: false }),
    login,
    )

router.route('/profile') // Đối tượng cần kiểm tra là token có hợp lệ hay không
  .get(passport.authenticate('jwt', { session: false }), getMe, )

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), getAll)
  .post(validateSchema(createSchema), create)

router.route('/:id')
  .get(validateSchema(getDetailSchema), passport.authenticate('jwt', { session: false }), getDetail)
  .patch(validateSchema(editSchema), passport.authenticate('jwt', { session: false }), update)
  .delete(validateSchema(getDetailSchema), passport.authenticate('jwt', { session: false }), remove)

module.exports = router;
