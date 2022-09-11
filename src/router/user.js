const userController = require('../controller/user');
const express = require('express'); 

const router = express.Router(); 

router.get("/", userController.getAllUsers);

router.get("/:userId", userController.getUserById);

router.post("/", userController.AddUser);

router.put("/:userId", userController.updateUserById);

router.delete("/deleteAll", userController.deleteAllUser); 

router.delete("/:userId", userController.deleteUserById);

module.exports = router;