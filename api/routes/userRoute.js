const express = require("express");
const router = express.Router();
const { getUsers, getUser, checkUser, editUsers, deleteUsers, addNewUser } = require('../controller/userController.js');


// get all users --->
router.route("/").get(getUsers);

// get partucular user --->
router.route("/:id").get(getUser);

// check user --->
router.route("/").post(checkUser);

// register new user --->
router.route("/newUser").post(addNewUser);

// edit user ---> 
router.route("/:id").put(editUsers);

// delete user ---> 
router.route("/:id").delete(deleteUsers);

module.exports = router;