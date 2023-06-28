const express = require('express');
const passport = require('passport');
const router = express.Router();

const { validateSchema } = require('../../../utils');
const {
  loginSchema,
  getDetailSchema,
  createSchema,
  editSchema,
} = require('./validations');
const {
  login,
  checkRefreshToken,
  basic,
  getMe,
  getAll,
  getDetail,
  create,
  remove,
  update,
} = require('./controller');
const allowRoles = require('../../../middleWares/checkRole');

router.route('/:id')
  .get(validateSchema(getDetailSchema), getDetail);

module.exports = router;
