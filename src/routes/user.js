const userController=require("../controllers/userController")
const middlewareController = require('../controllers/midlewareController');

const router=require("express").Router();

router.get("/:id", middlewareController.verifyToken,userController.getUserById)
router.patch("/:id",userController.updateUser)

module.exports=router