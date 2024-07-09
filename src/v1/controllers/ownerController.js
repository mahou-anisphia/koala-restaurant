const bcrypt = require("bcrypt");
const User = require("../service/userServices");
const Location = require("../service/locationServices");
const ER_DUP_ENTRY = "ER_DUP_ENTRY";

class OwnerController {
  static async CreateUser(req, res) {
    try {
      const {
        name: Name,
        role: Role,
        contactDetails: ContactDetails,
        login: Login,
        password: loginPassword,
        locationID: LocationID,
      } = req.body;
      if (!Name || !Role || !Login || !loginPassword || !LocationID) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const validRoles = ["Chef", "Waiter", "Customer", "Owner"];
      if (!validRoles.includes(Role)) {
        return res.status(400).json({ error: "Invalid role" });
      }
      const verifyLocation = await Location.FindByID(LocationID);
      if (!verifyLocation) {
        return res.status(400).json({ message: "Invalid LocationID" });
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
          .json({ message: "User created successfully", userID: result });
      } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    } catch (error) {
      if (error.code === ER_DUP_ENTRY) {
        return res.status(409).json({ error: "Duplicate username error" });
      }
      console.error("Error in CreateUser", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async UpdateUser(req, res) {
    const userID = req.params.id;
    const {
      name: Name,
      role: Role,
      contactDetails: ContactDetails,
      login: Login,
      password: Password,
      locationID: LocationID,
    } = req.body;

    try {
      const user = await User.FindByID(userID);

      if (!user) {
        return res.status(404).json({ error: "User does not exist" });
      }

      user.Name = Name || user.Name;
      if (Role) {
        const validRoles = ["Chef", "Waiter", "Customer", "Owner"];
        if (!validRoles.includes(Role)) {
          return res.status(400).json({ error: "Invalid role" });
        }
        user.Role = Role;
      }
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
        user.LocationID = LocationID;
      }

      try {
        const result = await User.UpdateUser(userID, user);
        if (result.affectedRows === 0) {
          console.error("No row affected in update user!");
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res
          .status(200)
          .json({ message: "User updated successfully", result });
      } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (error) {
      console.error("Error finding user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
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
      return res.status(500).json({ error: "Internal server error" });
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
        return res.status(500).json({ error: "Internal server error" });
      }
    } catch (error) {
      console.error("Error ViewEmployeeAccount:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async ViewAllEmployee(req, res) {
    try {
      const userList = await User.SelectAllUser();
      return res.status(200).json(userList);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async ViewEmployeeOnLocation(req, res) {
    const locationId = req.params.id;
    try {
      const userList = await User.FindByLocationID(locationId);
      if (!userList) {
        return res
          .status(404)
          .json({ error: "There is no user in this location" });
      }
      const sanitizedUserList = userList.map((user) => {
        const { Password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      return res.status(200).json(sanitizedUserList);
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  static async AssignUserRole(req, res) {
    const userId = req.params.id;
    const role = req.body.role;
    const validRoles = ["Chef", "Waiter", "Customer", "Owner"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ error: "Invalid role" });
    }
    try {
      const result = await User.UpdateRole(userId, role);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      return res
        .status(200)
        .json({ message: "User's role updated successfully", result });
    } catch (error) {
      if (error.code === ER_DUP_ENTRY) {
        return res.status(409).json({ error: "Duplicate username error" });
      }
      console.error("Error Assign Role to User:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  static async SearchUser(req, res) {
    const term = req.params.searchQueries;
    try {
      const result = await User.SearchUsers(term);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error Search Occured", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

module.exports = OwnerController;
