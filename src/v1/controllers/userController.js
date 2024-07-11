const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../service/userServices");
const Location = require("../service/locationServices");
const ER_DUP_ENTRY = "ER_DUP_ENTRY";

class UserController {
  static generateToken(user) {
    return jwt.sign(
      { userID: user.UserID, username: user.Login, fullName: user.Name },
      process.env.JWT_TOKEN,
      {
        expiresIn: "3d",
      }
    );
  }

  static async comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  static async Login(req, res) {
    const { username, password } = req.body;
    try {
      if (!username || !password) {
        return res.status(400).json({ message: "Missing input fields!" });
      }
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
      if (!newPassword) {
        return res.status(400).json({ message: "Missing input fields!" });
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      try {
        const validate = await User.ChangePassword(userID, hashedNewPassword);
        if (!validate) {
          return res.status(500).json({ message: "Failed to update password" });
        }
        return res
          .status(200)
          .json({ message: "Password updated successfully" });
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
      // if (Object.keys(location).length === 0) {
      //   location = "Missing field!";
      // }
      const profile = {
        UserID,
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
    // const userID = req.user.UserID;
    const user = req.user;
    const {
      name: Name,
      contactDetails: ContactDetails,
      login: Login,
      password: Password,
      locationID: LocationID,
    } = req.body;

    try {
      // const user = await User.FindByID(userID);

      // if (!user) {
      //   return res.status(404).json({ error: "User does not exist" });
      // }

      user.Name = Name || user.Name;
      // user.Role = Role || user.Role;
      user.ContactDetails = ContactDetails || user.ContactDetails;
      user.Login = Login || user.Login;
      if (Password) {
        user.Password = await bcrypt.hash(Password, 10);
      }
      if (LocationID) {
        const verifyLocation = await Location.FindByID(LocationID);
        if (!verifyLocation) {
          return res.status(400).json({ message: "Invalid LocationID" });
        }
      }
      user.LocationID = LocationID || user.LocationID;

      try {
        const result = await User.UpdateUser(user.UserID, user);
        if (result.affectedRows === 0) {
          console.error("No row affected in update user!");
          return res.status(500).json({ error: "Internal server error" });
        }
        return res
          .status(200)
          .json({ message: "User updated successfully", result });
      } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } catch (error) {
      if (error.code === ER_DUP_ENTRY) {
        return res.status(409).json({ error: "Duplicate username error" });
      }
      console.error("Error finding user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = UserController;
