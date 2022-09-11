const mongoose = require("mongoose");
const User = require("../model/user");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "users fetched successFully :)",
      noOfBooks: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await User.findById(userId);
    if (!result)
      res.status(200).json({ message: "No user found by this id :(", userId });
    else res.status(200).json({ message: "User found :)", result });
  } catch (error) {
    next(error);
  }
};

exports.AddUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const _id = new mongoose.Types.ObjectId();
    const user = { _id, email, password };
    const result = await User.create(user);
    res.status(201).json({ message: "User created sucessfully :)", result });
  } catch (error) {
    next(error);
  }
};

exports.updateUserById = async (req, res, next) => {
  try {
    const user = {
      _id: req.params.userId,
      email: req.body.email,
      password: req.body.password,
    };
    const result = await User.findByIdAndUpdate(user._id);
    if (!result)
      res
        .status(502)
        .json({ message: "User update failed :(", dataToUpdate: user });
    else
      res
        .status(200)
        .json({ message: "User updated sucessfully :)", oldeUser: result });
  } catch (error) {
    next(error);
  }
};

exports.deleteUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    if (!user)
      res.status(404).json({ message: "failed to delete user :(", userId });
    else
      res.status(200).json({ message: "user deleted successfully :)", user });
  } catch (error) {
    next(error);
  }
};

exports.deleteAllUser = async (req, res, next) => {
  try {
    const result = await User.deleteMany();
    res
      .status(200)
      .json({ message: "All users deleted successfully :)", result });
  } catch (error) {
    next(error);
  }
};
