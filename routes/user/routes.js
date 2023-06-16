var express = require('express');
const router = express.Router();

const passport = require('passport');

const categoriesRouter = require('./category/router');
const customersRouter = require('./customer/router');
const employeesRouter = require('./employee/router');
const ordersRouter = require('./order/router');
const productsRouter = require('./product/router');
const suppliersRouter = require('./supplier/router');

router.use('/employees', employeesRouter);
router.use('/categories', categoriesRouter);
// router.use('/categories', passport.authenticate('jwt', { session: false }), categoriesRouter);
router.use('/suppliers', passport.authenticate('jwt', { session: false }), suppliersRouter);
router.use('/customers', passport.authenticate('jwt', { session: false }), customersRouter);
// router.use('/products', passport.authenticate('jwt', { session: false }), productsRouter);
router.use('/products', productsRouter);
router.use('/orders', passport.authenticate('jwt', { session: false }), ordersRouter);

module.exports = router;
