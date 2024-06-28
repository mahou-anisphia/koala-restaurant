const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../service/userServices");

class UserVerifyMiddleware {
  static VerifyCustomer = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader;
    if (token == null) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.EMPLOYEE_JWT_KEY, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.userID = jwt.decode(token, process.env.EMPLOYEE_JWT_KEY);
      next();
    });
  };
}
