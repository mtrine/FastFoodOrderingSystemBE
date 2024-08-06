const favoriteController=require('../controllers/favoriteController');
const middlewareController = require('../controllers/midlewareController');
const express = require('express');
const router = express.Router();

router.post('/:userId',middlewareController.verifyToken, favoriteController.addFavorite);
router.get('/',middlewareController.verifyToken, favoriteController.getAllFavorites);
module.exports = router;