const foodController = require('../controllers/foodController');
const router = require('express').Router();
router.post('/', foodController.addFood);
router.get('/', foodController.getAllFoods);
router.get('/:id', foodController.getFood);
module.exports = router;