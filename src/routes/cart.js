const cartController= require('../controllers/cartController');
// const middlewareController = require('../controllers/middlewareController');
const router = require('express').Router();

router.get('/:userId',cartController.getCartByUserId);
router.post('/:userId',cartController.addFoodToCart);
router.delete('/:cartId',cartController.deleteFoodFromCart);

module.exports = router;