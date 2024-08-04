const orderController=require('../controllers/orderController');
const express = require('express');
const router = express.Router();

router.post('/:userId', orderController.createOrder);
router.get('/:userId', orderController.getOrdersByUserId);
router.put('/:id', orderController.updateOrder);
module.exports = router;