const foodController = require('../controllers/foodController');
const middlewareController = require('../controllers/midlewareController');
const router = require('express').Router();

router.post('/',middlewareController.verifyToken, foodController.addFood);
router.get('/',middlewareController.verifyToken, foodController.getAllFoods);
router.get('/:id',middlewareController.verifyToken, foodController.getFood);
module.exports = router;