const express = require("express");
const router = express.Router()
const {registerUser, editUser, uploadPhoto, checkEmail} = require("../controllers/userController")
const {loginUser} = require("../controllers/userController")
const {getAllUser} = require("../controllers/userController")
const {getAdminUser} = require("../controllers/userController")
const {protect} = require("../MiddleWares/authMiddleware");
router.post("/register",registerUser)
router.post("/login",loginUser)
router.put('/:id' ,protect ,editUser);
router.get('/getusers' ,protect ,getAllUser);
router.get('/getadmin' ,protect ,getAdminUser);
router.post('/checkemail' ,protect ,checkEmail);
module.exports = router
