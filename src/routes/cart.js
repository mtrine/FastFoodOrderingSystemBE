const cartController= require('../controllers/cartController');
const middlewareController = require('../controllers/midlewareController');
const router = require('express').Router();

router.get('/:userId',middlewareController.verifyToken,cartController.getCartByUserId);
router.post('/:userId',middlewareController.verifyToken,cartController.addFoodToCart);
router.put('/:userId',middlewareController.verifyToken,cartController.updateCart);
router.delete('/:cartId',middlewareController.verifyToken,cartController.deleteFoodFromCart);

module.exports = router;