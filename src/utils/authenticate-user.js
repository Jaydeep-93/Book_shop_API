const User = require("../model/user");
const jwt = require("jsonwebtoken");

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authtoken;
    const decoded = jwt.verify(token, "my_secret");
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      res.status(400).json({ message: "User dones not exists :(", token });
    } else {
        req.userData = user.toJSON() ; 
      next();
    }
  } catch (error) {
    next(error);
  }
};
