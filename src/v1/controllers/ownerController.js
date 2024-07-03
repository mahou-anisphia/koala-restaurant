const bcrypt = require("bcrypt");
const User = require("../service/userServices");
const Location = require("../service/locationServices");

class OwnerController {
  static async CreateUser(req, res) {
    try {
      const { Name, Role, ContactDetails, Login, loginPassword, LocationID } =
        req.body;
      if (!Name || !Role || !Login || !loginPassword || !LocationID) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const validRoles = ["Chef", "Waiter", "Customer", "Owner"];
      if (!validRoles.includes(Role)) {
        return res.status(400).json({ error: "Invalid role" });
      }

      const Password = await bcrypt.hash(loginPassword, 10);
      const userDetails = {
        Name,
        Role,
        ContactDetails: ContactDetails || null, // ContactDetails can be null
        Login,
        Password,
        LocationID,
      };

      try {
        const result = await User.CreateUser(userDetails);
        return res
          .status(201)
          .json({ message: "User created successfully", result });
      } catch (error) {
        console.error("Error creating user:", error);
        return res
          .status(500)
          .json({ error: "An error occurred while creating the user" });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while creating the user" });
    }
  }

  static async UpdateUser(req, res) {
    const userID = req.params.id;
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

  static async DeleteUser(req, res) {
    const userID = req.params.id;
    try {
      const result = await User.DeleteUser(userID);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found." });
      }
      return res.status(200).json({ message: "User deleted successfully." });
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ error: "Internal server error." });
    }
  }

  static async ViewEmployeeAccount(req, res) {
    const userID = req.params.id;
    try {
      const user = await User.FindByID(userID);
      if (!user) {
        return res.status(404).json({ error: "User does not exist" });
      }

      try {
        const location = await Location.FindByID(user.LocationID);
        const { Password, ...userWithoutPassword } = user;
        const profile = {
          user: userWithoutPassword,
          location,
        };
        return res.status(200).json(profile);
      } catch (error) {
        console.error("Error fetching location:", error);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching the location" });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching the user" });
    }
  }

  static async ViewAllEmployee(req, res) {
    try {
      const userList = await User.SelectAllUser();
      const sanitizedUserList = userList.map((user) => {
        const { Password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      return res.status(200).json(sanitizedUserList);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching the users" });
    }
  }

  static ViewEmployeeOnLocation(req, res) {
    return res;
  }
  static AssignUserRole(req, res) {
    return res;
  }
}

module.exports = OwnerController;