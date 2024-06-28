const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../service/userServices");

class UserController {
  static generateToken(user) {
    return jwt.sign({ userID: user.UserID }, process.env.JWT_TOKEN, {
      expiresIn: "3d",
    });
  }
  static async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
  static async Login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.FindByUsername(username);
      if (!user) {
        return res
          .status(404)
          .json({ message: "Invalid username or password" });
      }
      const validate = await UserController.comparePassword(
        password,
        user.Password
      );
      if (!validate) {
        return res
          .status(404)
          .json({ message: "Invalid username or password" });
      }
      const token = UserController.generateToken(user);
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  static async ChangePassword(req, res) {
    return res.status(200).json({ message: "Change Password" });
  }
}

module.exports = UserController;
