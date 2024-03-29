
const { Product, Category, Supplier } = require('../../../models');

module.exports = {
  getProductAll: async (req, res, next) => {
    try {
      let results = await Product.find()
        .populate('category')
        .populate('supplier');
  
      return res.send({ code: 200, payload: results, total: results.length });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  getProductList: async (req, res, next) => {
    try {
      const { limit = 2, page, categoryId, priceStart, priceEnd, supplierId } = req.query;

      const skip = +page || 1; // 3

      const conditionFind = {}; // giới tính = nữ

      if(categoryId) {
        conditionFind.categoryId = categoryId;
      };

      if(supplierId) {
        conditionFind.supplierId = supplierId;
      };

      if (priceStart && priceEnd) {
        const compareStart = { $lte: ['$price', priceEnd] };
        const compareEnd = { $gte: ['$price', priceStart] };
        conditionFind.$expr = { $and: [compareStart, compareEnd] };
      } else if (priceStart) {
        conditionFind.price = {$gte : parseFloat(priceStart)};
      } else if (priceEnd) {
        conditionFind.price ={$lte : parseFloat(priceEnd)};
      }

      const conditionSort = {};

      switch (order) {
        case 1:
          conditionSort.createdAt = 1
          break;
        case 2:
          conditionSort.price = 1
          break;
        case 3:
          conditionSort.price = -1
          break;
      
        default:
          conditionSort.createdAt = -1
          break;
      }

      const results = await Product.find(conditionFind)
        .populate('category')
        .populate('supplier')
        .sort(conditionSort)
        .skip(limit * (skip - 1))
        .limit(limit * 1)

      const total = await Product
        .countDocuments(conditionFind)
  
      return res.send({ code: 200, total, payload: results });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },
  
  getProductDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
  
      let found = await Product.findById(id)
        .populate('category')
        .populate('supplier');
  
      if (found) {
        return res.send({ code: 200, payload: found });
      }
  
      return res.status(410).send({ code: 404, message: 'Không tìm thấy' });
    } catch (err) {
      res.status(404).json({
        message: 'Get detail fail!!',
        payload: err,
      });
    }
  },

  createProduct: async function (req, res, next) {
    try {
      const data = req.body;

      const { categoryId, supplierId } = data;

      // Cách 1: validate từng dữ liệu
      // const findCategory = await Category.findById(categoryId);
      // console.log('««««« findCategory »»»»»', findCategory);

      // if (!findCategory || findCategory.isDelete) {
      //   return res.status(404).json({ code: 404, message: "Danh mục không tồn tại" });
      // }

      // const findSupplier = await Supplier.findById(supplierId);
      // if (!findSupplier) {
      //   return res.status(404).json({ code: 404, message: "Nhà cung cấp không tồn tại" });
      // }

      // const findCategory = await Category.findById(categoryId);

      // Cách 2: validate hàng loạt
      const findCategory = Category.findById(categoryId);
      const findSupplier = Supplier.findById(supplierId);

      const [category, supplier] = await Promise.all([findCategory, findSupplier]);

      const errors = [];
      if (!category || category.isDelete) errors.push('Danh mục không tồn tại');
      if (!supplier || supplier.isDelete) errors.push('Nhà cung cấp không tồn tại');

      if (errors.length > 0) {
        return res.status(404).json({
          code: 404,
          message: "Không tồn tại",
          errors,
        });
      }

      const newItem = new Product(data);
  
      let result = await newItem.save();
  
      return res.send({ code: 200, message: 'Tạo thành công', payload: result });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  deleteProduct: async function (req, res, next) {
    try {
      const { id } = req.params;
  
      let found = await Product.findByIdAndDelete(id);
  
      if (found) {
        return res.send({ code: 200, payload: found, message: 'Xóa thành công' });
      }
  
      return res.status(410).send({ code: 404, message: 'Không tìm thấy' });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  updateProduct: async function (req, res, next) {
    try {
      const { id } = req.params;  
      const updateData = req.body;
      const { categoryId, supplierId } = updateData;

      const findCategory = Category.findById(categoryId);
      const findSupplier = Supplier.findById(supplierId);

      const [category, supplier] = await Promise.all([findCategory, findSupplier]);

      const errors = [];
      if (!category || category.isDelete) errors.push('Danh mục không tồn tại');
      if (!supplier || supplier.isDelete) errors.push('Nhà cung cấp không tồn tại');

      if (errors.length > 0) {
        return res.status(404).json({
          code: 404,
          message: "Không tồn tại",
          errors,
        });
      }
  
      const found = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
      });
  
      if (found) {
        return res.send({
          code: 200,
          message: 'Cập nhật thành công',
          payload: found,
        });
      }
  
      return res.status(410).send({ code: 400, message: 'Không tìm thấy' });
    } catch (error) {
      return res.status(500).json({ code: 500, error: err });
    }
  },
};
