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
      return res.status(200).json({ token });
    } catch (error) {
      console.error("Error logging in:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async ChangePassword(req, res) {
    try {
      const newPassword = req.body.newPassword;
      const userID = req.user.UserID;
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      try {
        await User.ChangePassword(userID, hashedNewPassword);
        return res.json({ message: "Password updated successfully" });
      } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({ message: "Internal server error" });
      }
    } catch (error) {
      console.error("Error hashing password:", error);
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

    try {
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

      return res.status(200).json(profile);
    } catch (error) {
      console.error("Error fetching location:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  static async UpdateUser(req, res) {
    const userID = req.user.UserID;
    const { Name, Role, ContactDetails, Login, Password, LocationID } =
      req.body;

    try {
      const user = await User.FindByID(userID);

      if (!user) {
        return res.status(404).json({ error: "User does not exist" });
      }

      user.Name = Name || user.Name;
      user.Role = Role || user.Role;
      user.ContactDetails = ContactDetails || user.ContactDetails;
      user.Login = Login || user.Login;
      if (Password) {
        user.Password = await bcrypt.hash(Password, 10);
      }
      user.LocationID = LocationID || user.LocationID;

      try {
        const result = await User.UpdateUser(userID, user);
        if (result.affectedRows === 0) {
          return res
            .status(500)
            .json({ error: "An error occurred while saving your updates" });
        }
        return res
          .status(200)
          .json({ message: "User updated successfully", result });
      } catch (error) {
        console.error("Error updating user:", error);
        return res
          .status(500)
          .json({ error: "An error occurred while updating the user" });
      }
    } catch (error) {
      console.error("Error finding user:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while updating the user" });
    }
  }
}

module.exports = UserController;
