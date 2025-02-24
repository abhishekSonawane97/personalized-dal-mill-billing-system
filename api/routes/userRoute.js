const express = require("express");
const { getUsers, getUser, checkUser, editUsers, deleteUsers, addNewUser } = require('../controller/userController.js');
const validateToken = require("../middleware/validateTokenHandler.js");

const router = express.Router();

// get all users --->
// router.get( "/" , getUsers );

// get partucular user --->
router.get("/", validateToken, getUser );

// check user --->
router.post("/" , checkUser );

// register new user --->
router.post("/newUser" , addNewUser );

// edit user ---> 
router.put("/:id", validateToken , editUsers );

// delete user ---> 
router.delete("/:id", validateToken , deleteUsers );

module.exports = router;