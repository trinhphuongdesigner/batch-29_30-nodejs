var express = require('express');
var router = express.Router();
const yup = require('yup');

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

  const validationSchema = yup.object().shape({
    id: yup.number().test('Kiem_tra_do_dai_id', 'Sai định dạng rồi mài', val => {
      return val.length === 13
    }),
  });

  validationSchema
    .validate(req.params)
    .then(() => {
      console.log('Validation passed');

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
    })
    .catch((err) => {
      res.status(404).json({
        message: 'Get detail fail!!',
        payload: err,
      });
    });
});

router.post('/', function(req, res, next) {
  const { name, price, description, discount, phone, supplierId } = req.body;

  const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

  const validationSchema = yup.object().shape({
    body: yup.object({
      name: yup.string().max(50).required(),
      price: yup.number().min(0, 'Giá phải lớn hơn hoặc bằng 0').required(),
      description: yup.string(),
      phone: yup.string().matches(phoneRegExp, 'SỐ ĐIỆN THOẠI BỊ SAI').required('Số dt không được bỏ trống'),
      supplierId: yup.number().test('Kiem_tra_do_dai_id', 'Sai định dạng rồi mài', val => {
        if (!val) return true;
  
        return val.length === 13
      }),
      // isHasWife: yup.bool(),
      // wifeName: yup.string().test({
      //   message: 'Tên vợ không được để trống',
      //   test(value) {
      //       if (this.parent.isHasWife && !value) return false;
    
      //       return true;
      //     },
      // })
    })
  });  

  validationSchema
  .validate({ body: req.body}, { abortEarly: false })
  .then(() => {
    console.log('Validation passed');

    const initID = generationID();

    const newProduct = {
      id: initID,
      name,
      price,
      description,
      discount,
      phone,
      // supplierId: supplierId && supplierId,
      // ...(supplierId && { supplierId }),
    };

    if (supplierId) {
      newProduct.supplierId = supplierId;
    }

    products.push(newProduct);

    const newP = products.find((p) => p.id.toString() === initID.toString());
  
    writeFileSync('./data/products.json', products);
  
    res.status(201).json({
      code: 2011,
      message: 'Created success!!',
      payload: newP,
    });
  })
  .catch((err) => {
    return res.status(400).json({
      type: err.name,
      errors: err.errors,
      provider: 'yup'
    });
  });

});

router.patch('/:id', function(req, res, next) {
  // const getProductsSchema = yup.object({
  //   query: yup.object({
  //     category: yup.string().test('Validate ObjectID', '${path} is not valid ObjectID', (value) => {
  //       if (!value) return true;
  //       return ObjectId.isValid(value);
  //     }),
  //     sup: yup.string().test('Validate ObjectID', '${path} is not valid ObjectID', (value) => {
  //       if (!value) return true;
  //       return ObjectId.isValid(value);
  //     }),
  //     productName: yup.string(),
  //     stockStart: yup.number().min(0),
  //     stockEnd: yup.number(),
  //     priceStart: yup.number().min(0),
  //     priceEnd: yup.number(),
  //     discountStart: yup.number().min(0),
  //     discountEnd: yup.number().max(50),
  //     skip: yup.number(),
  //     limit: yup.number(),
  //   }),
  // });

  // schema.validate({
  //   body: req.body,
  //   query: req.query,
  //   params: req.params,
  // })

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

module.exports = router;
