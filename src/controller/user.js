const mongoose = require("mongoose");
const User = require("../model/user");
const bcrypt = require("bcrypt");

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

// exports.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // fetch user with given email if exists
//     const users = await User.find({ email });
//     if (users.length != 0) {
//       // if user exists check for password get first user and check for password
//       const user = users[0];
//       // compare if password match
//       if (await bcrypt.compare(hashPassword, user.password)) {
//         // if yes ==> login successfull
//         res.status(200).json({ message: "User access granted :)", user });
//       } else {
//         // in no ==> login failed
//         res.status(404).json({
//           message: "Wrong combination of mail id password :(",
//           providedData: req.body,
//         });
//       }
//     } else {
//       // no ==> login faulied
//       res.status(404).json({
//         message: "No user exists with this email :(",
//         providedData: req.body,
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

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

// exports.AddUser = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     // make sure user to be added in unique
//     const prevUser = await User.find({ email });
//     if (prevUser.length !== 0)
//       res.status(400).json({
//         message: "User already exists with this id password :(",
//         providedData: { email, password },
//       });
//     else {
//       // user does not exists
//       const hashPassword = await bcrypt.hash(password, 10);
//       const _id = new mongoose.Types.ObjectId();
//       const user = { _id, email, password: hashPassword };
//       const result = await User.create(user);
//       res.status(201).json({ message: "User created sucessfully :)", result });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

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
