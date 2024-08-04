const favoriteController=require('../controllers/favoriteController');
const express = require('express');
const router = express.Router();

router.post('/:userId', favoriteController.addFavorite);
router.get('/', favoriteController.getAllFavorites);
module.exports = router;