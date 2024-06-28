const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../service/userServices");

class UserVerifyMiddleware {
  static verifyRole = (role) => {
    return (req, res, next) => {
      const authHeader = req.header("Authorization");
      const token = authHeader;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      jwt.verify(token, process.env.EMPLOYEE_JWT_KEY, async (err, decodedToken) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden" });
        }
        const userID = decodedToken.userID;
        const user = await User.FindByID(userID);
        if (user) {
          if (user.role === role) {
            req.user = user;
            return next();
          }
          return res.status(403).json({ message: "Forbidden" });
        }
        return res.status(404).json({ message: "User not found" });
      });
    };
  };

  static VerifyCustomer = UserVerifyMiddleware.verifyRole("Customer");
  static VerifyOwner = UserVerifyMiddleware.verifyRole("Owner");
  static VerifyChief = UserVerifyMiddleware.verifyRole("Chief");
  static VerifyWaiter = UserVerifyMiddleware.verifyRole("Waiter");
}

module.exports = UserVerifyMiddleware;
