const express = require('express');
const router = express.Router();

const { validateSchema } = require('../../../utils');
const {
  getProductsSchema,
  getProductSchema,
} = require('./validations');
const {
  getProductAll,
  getProductList, // thêm bộ lọc và tìm kiếm
  getProductDetail,
} = require('./controller');

router.route('/').get(getProductAll)

router.route('/search').get(validateSchema(getProductsSchema), getProductList)

router.route('/:id').get(validateSchema(getProductSchema), getProductDetail)

module.exports = router;
