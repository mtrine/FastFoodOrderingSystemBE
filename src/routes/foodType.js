const foodTypeController = require('../controllers/foodTypeController');
const router = require('express').Router();

router.get('/', foodTypeController.getAllFoodTypes);
router.post('/', foodTypeController.addFoodType);
router.get('/:id', foodTypeController.getFoodType);
router.put('/:id', foodTypeController.updateFoodType);
module.exports = router;