const foodController = require('../controllers/foodController');
const middlewareController = require('../controllers/midlewareController');
const router = require('express').Router();

router.post('/',middlewareController.verifyToken, foodController.addFood);
router.get('/',middlewareController.verifyToken, foodController.getAllFoods);
router.get('/:id',middlewareController.verifyToken, foodController.getFood);
router.patch('/:id',middlewareController.verifyToken, foodController.updateFood);
router.delete('/:id',middlewareController.verifyToken, foodController.deleteFood);
router.get("/foodTypes/:foodTypeId",middlewareController.verifyToken,foodController.getFoodByFoodType);
module.exports = router;