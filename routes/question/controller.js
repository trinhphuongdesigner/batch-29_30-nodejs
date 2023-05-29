
const { Product, Category, Supplier } = require('../../models');

module.exports = {
  q1: async (req, res, next) => {
    try {
      const conditionFind = {
        discount: { $lte: 10 },
      };

      console.log('««««« conditionFind »»»»»', conditionFind);
    
      let results = await Product.find(conditionFind);
      let total = await Product.countDocuments();
  
      return res.send({ code: 200, total, totalResult: results.length, payload: results });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  q1a: async (req, res, next) => {
    try {
      const { discount, type } = req.query;

      const conditionFind = {};

      if (discount) {
        switch (type) {
          case 'eq':
            conditionFind.discount = { $eq : discount }
            break;

          case 'lt':
            conditionFind.discount = { $lt : discount }
            break;

          case 'lte':
            conditionFind.discount = { $lte : discount }
            break;

          case 'gt':
            conditionFind.discount = { $gt : discount }
            break;

          case 'gte':
            conditionFind.discount = { $gte : discount }
            break;
        
          default:
            conditionFind.discount = { $eq : discount }
            break;
        }
      }

      console.log('««««« conditionFind »»»»»', conditionFind);
    
      let results = await Product.find(conditionFind);
      let total = await Product.countDocuments();
  
      return res.send({ code: 200, total, totalResult: results.length, payload: results });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  question1: async (req, res, next) => {
    try {
      const { discount, type } = req.query;

      const conditionFind = {};

      if (discount) {
        switch (type) {
          case 'eq':
            conditionFind.discount = { $eq : discount }
            break;

          case 'lt':
            conditionFind.discount = { $lt : discount }
            break;

          case 'lte':
            conditionFind.discount = { $lte : discount }
            break;

          case 'gt':
            conditionFind.discount = { $gt : discount }
            break;

          case 'gte':
            conditionFind.discount = { $gte : discount }
            break;
        
          default:
            conditionFind.discount = { $eq : discount }
            break;
        }
      }

      console.log('««««« conditionFind »»»»»', conditionFind);
    
      let results = await Product.find(conditionFind);
      let total = await Product.countDocuments();
  
      return res.send({ code: 200, total, totalResult: results.length, payload: results });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },
};
