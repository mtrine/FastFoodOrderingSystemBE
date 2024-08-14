const orderController=require('../controllers/orderController');
const express = require('express');
const router = express.Router();
const middlewareController = require('../controllers/midlewareController');

router.post('/:userId',middlewareController.verifyToken, orderController.createOrder);
router.get('/bestSeller',middlewareController.verifyToken, orderController.getTopOrderedFoods);
router.get('/:userId',middlewareController.verifyToken, orderController.getOrdersByUserId);
router.put('/:id',middlewareController.verifyToken, orderController.updateOrder);
module.exports = router;