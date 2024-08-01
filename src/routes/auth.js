const authController = require('../controllers/authController');
const middlewareController = require('../controllers/midlewareController');

const router = require('express').Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);
router.post('/logout', middlewareController.verifyToken,authController.logout);
module.exports = router;