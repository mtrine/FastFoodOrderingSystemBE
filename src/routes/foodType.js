const foodTypeController = require('../controllers/foodTypeController');
const middlewareController = require('../controllers/midlewareController');
const router = require('express').Router();

router.get('/',middlewareController.verifyToken, foodTypeController.getAllFoodTypes);
router.post('/', middlewareController.verifyToken, foodTypeController.addFoodType);
router.get('/:id',middlewareController.verifyToken, foodTypeController.getFoodType);
router.put('/:id',middlewareController.verifyToken, foodTypeController.updateFoodType);
module.exports = router;