const bcrypt = require("bcrypt");
const User = require("../service/userServices");

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
      const result = await User.CreateUser(userDetails);
      return res
        .status(201)
        .json({ message: "User created successfully", result });
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
