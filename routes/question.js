const express = require('express');
const router = express.Router();

const { Product } = require('../models');

// GET ALL
router.get('/', async (req, res, next) => {
  try {
    let results = await Product.find()
      .populate('category')
      .populate('supplier');

    return res.send({ code: 200, payload: results });
  } catch (err) {
    return res.status(500).json({ code: 500, error: err });
  }
});

module.exports = router;
