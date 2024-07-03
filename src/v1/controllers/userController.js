const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../service/userServices");
const Location = require("../service/locationServices");

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
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  static async ChangePassword(req, res) {
    try {
      const newPassword = req.body.newPassword;
      const userID = req.user.UserID;
      const hashedNewPassoword = await bcrypt.hash(newPassword, 10);
      await User.ChangePassword(userID, hashedNewPassoword);
      res.json({ message: "Password updated successfully" });
    } catch (error) {
      console.error("Error changing password:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  static async ViewProfile(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      UserID,
      Name,
      Role,
      ContactDetails,
      Login,
      CreationDate,
      ModificationDate,
      LocationID,
    } = req.user;
    const location = await Location.FindByID(LocationID);
    delete location.LocationID;
    delete location.CreationDate;
    delete location.ModificationDate;
    const profile = {
      Name,
      Role,
      ContactDetails,
      Login,
      CreationDate,
      ModificationDate,
      location,
    };

    res.status(200).json(profile);
  }
}

module.exports = UserController;
