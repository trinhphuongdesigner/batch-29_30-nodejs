const express = require('express');
const router = express.Router();

const { Category } = require('../models');

// GET ALL
router.get('/', async (req, res, next) => {
  try {
    let results = await Category.find();
    res.send(results);
  } catch (err) {
    return res.status(500).json({ ok: false, error: err });
  }
});

// GET DETAIL
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;

    let found = await Category.findById(id);

    if (found) {
      return res.send({ ok: true, payload: found });
    }

    return res.status(410).send({ ok: false, message: 'Không tìm thấy' });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err });
  }
});

// POST
router.post('/', async function (req, res, next) {
  try {
    const data = req.body;

    const newItem = new Category(data);

    let result = await newItem.save();

    return res.send({ ok: true, message: 'Tạo thành công', payload: result });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err });
  }
});

// DELETE
router.delete('/:id', async function (req, res, next) {
  try {
    const { id } = req.params;

    let found = await Category.findByIdAndDelete(id);

    if (found) {
      return res.send({ ok: true, payload: found });
    }

    return res.status(410).send({ ok: false, message: 'Không tìm thấy' });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err });
  }
});

// UPDATE
router.patch('/:id', async function (req, res, next) {
  try {
    const { id } = req.params;

    const updateData = req.body;

    const found = await Category.findByIdAndUpdate(id, updateData, { new: true });

    if (found) {
    return res.send({ ok: true, message: 'Cập nhật thành công', payload: found });
    }

    return res.status(410).send({ ok: false, message: 'Không tìm thấy' });

  } catch (error) {
    return res.status(500).json({ ok: false, error: err });
  }
});

module.exports = router;
