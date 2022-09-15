const userController = require('../controller/user');
const express = require("express");
const authenticator = require("../utils/authenticate-user");

const router = express.Router();

router.get("/", authenticator.authenticateUser, userController.getAllUsers);

// router.get("/login", userController.login);

router.get(
  "/:userId",
  authenticator.authenticateUser,
  userController.getUserById
);

// router.post("/", userController.AddUser);

router.put(
  "/:userId",
  authenticator.authenticateUser,
  userController.updateUserById
);

router.delete(
  "/deleteAll",
  authenticator.authenticateUser,
  userController.deleteAllUser
);

router.delete(
  "/:userId",
  authenticator.authenticateUser,
  userController.deleteUserById
);


module.exports = router;