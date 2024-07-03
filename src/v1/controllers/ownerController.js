const bcrypt = require("bcrypt");
const User = require("../service/userServices");

class OwnerController {
  static async CreateUser(req, res) {
    try {
      const { Name, Role, ContactDetails, Login, Password, LocationID } =
        req.body;

      // Validate input
      if (!Name || !Role || !Login || !Password || !LocationID) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const validRoles = ["Chef", "Waiter", "Customer", "Owner"];
      if (!validRoles.includes(Role)) {
        return res.status(400).json({ error: "Invalid role" });
      }

      // Prepare user details
      const userDetails = {
        Name,
        Role,
        ContactDetails: ContactDetails || null, // ContactDetails can be null
        Login,
        Password,
        LocationID,
      };

      // Call the data model method to create user
      const result = await User.CreateUser(userDetails);

      // Send success response
      return res
        .status(201)
        .json({ message: "User created successfully", result });
    } catch (error) {
      // Handle errors
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while creating the user" });
    }
  }

  static UpdateUser(req, res) {
    return res;
  }
  static DeleteUser(req, res) {
    return res;
  }
  static ViewEmployeeAccount(req, res) {
    return res;
  }
  static ViewAllEmployee(req, res) {
    return res;
  }
  static ViewEmployeeOnLocation(req, res) {
    return res;
  }
  static AssignUserRole(req, res) {
    return res;
  }
}

module.exports = OwnerController;
