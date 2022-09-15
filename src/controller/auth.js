const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      // if we do not found user
      res.status(404).json({
        message: "User with given email and password not found",
        user: { email, password },
      });
    } else {
      // if user found check for password
      if (await bcrypt.compare(password, user.password)) {
        // true
        // login successfull
        const token = jwt.sign(user.toJSON(), "my_secret");
        // send with token
        res.status(200).json({ message: "Login successfull :)", user, token });
      } else {
        res.status(200).json({
          message: "email and password do not match",
          user: { email, password },
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      // duplicate user cannot be added
      res
        .status(400)
        .json({ message: "Duplicate user cannot be added", email, password });
    } else {
      // encrypt password and add to Db
      const encryptedPassword = await bcrypt.hash(password, 10);
      const _id = new mongoose.Types.ObjectId();
      const createdUser = await User.create({ _id, email, password: encryptedPassword });
      res
        .status(201)
        .json({ message: "user created successfully :)", createdUser });
    }
  } catch (error) {
    next(error);
  }
};
