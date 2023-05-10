var express = require('express');
var router = express.Router();

const { generationID, writeFileSync } = require('../utils');

const products = require('../data/products.json');

/* GET users listing. */

router.get('/', function(req, res, next) {
  res.status(200).json({
    code: 2001,
    message: 'Get success!!',
    total: products.length,
    payload: products,
  });
});

router.get('/:id', function(req, res, next) {
  const id = req.params.id;

  const product = products.find((p) => p.id.toString() === id.toString());

  if (!product) {
    res.status(404).json({
      code: 4041,
      message: 'Get detail fail!!',
    });
  }

  res.status(200).json({
    code: 2001,
    message: 'Get detail success!!',
    payload: product,
  });
});

router.post('/', function(req, res, next) {
  const { name, price, description, discount, supplierId } = req.body;

  const initID = generationID();

  const newProduct = {
    id: initID,
    name,
    price,
    description,
    discount,
    supplierId,
  };

  products.push(newProduct);

  const newP = products.find((p) => p.id.toString() === initID.toString());

  writeFileSync('./data/products.json', products);

  res.status(201).json({
    code: 2011,
    message: 'Created success!!',
    payload: newP,
  });
});

router.patch('/:id', function(req, res, next) {
  const { id } = req.params;

  const checkProductExits = products.find((p) => p.id.toString() === id.toString());

  if (!checkProductExits) {
    res.status(404).json({
      code: 4041,
      message: 'Not found',
    });
  }

  const productUpdate = {
    ...checkProductExits,
    ...req.body,
  }

  const newProductList = products.map((p) => {
    if (p.id.toString() === id.toString()) {
      return productUpdate;
    } 

    return p;
  })

  writeFileSync('./data/products.json', newProductList);

  res.status(201).json({
    code: 2011,
    message: 'Update success!!',
    payload: productUpdate,
  });
});

router.put('/:id', function(req, res, next) {
  const { id } = req.params;

  const checkProductExits = products.find((p) => p.id.toString() === id.toString());

  if (!checkProductExits) {
    res.status(404).json({
      code: 4041,
      message: 'Not found',
    });
  }

  const productUpdate = {
    ...req.body,
    id: Number(id),
  }

  const newProductList = products.map((p) => {
    if (p.id.toString() === id.toString()) {
      return productUpdate;
    } 

    return p;
  })

  writeFileSync('./data/products.json', newProductList);

  res.status(201).json({
    code: 2011,
    message: 'Update success!!',
    payload: productUpdate,
  });
});


router.delete('/:id', function(req, res, next) {
  const { id } = req.params;

  const newProductList = products.filter((p) => p.id.toString() !== id.toString());

  writeFileSync('./data/products.json', newProductList);

  res.status(201).json({
    code: 2011,
    message: 'Delete success!!',
  });
});

// router.post('/res', function(req, res, next) {
//   res.send('this is Post method');
// });

// router.put('/res', function(req, res, next) {
//   res.send('this is put method');
// });

// router.delete('/res', function(req, res, next) {
//   res.send('this is delete method');
// });

// router.patch('/res', function(req, res, next) {
//   res.send('this is patch method');
// });

module.exports = router;
