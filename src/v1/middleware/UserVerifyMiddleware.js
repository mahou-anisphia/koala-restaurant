const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../service/userServices");

class UserVerifyMiddleware {
  static verifyRole = (role) => {
    return async (req, res, next) => {
      const authHeader = req.header("Authorization");
      const token = authHeader;
      if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      try {
        jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => {
          if (err) {
            return res.status(401).json({ message: "Unauthorized" });
          }
          try {
            const userID = decodedToken.userID;
            const user = await User.FindByID(userID);
            if (user) {
              if (user.Role === role) {
                req.user = user;
                return next();
              }
              return res.status(403).json({ message: "Forbidden" });
            } else {
              return res.status(404).json({ message: "User does not exist" });
            }
          } catch (error) {
            console.error("Error in verifyRole:", error);
            return res.status(500).json({ message: "Internal Server Error" });
          }
        });
      } catch (error) {
        console.error("Error in JWT verification:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    };
  };

  static VerifyCustomer = UserVerifyMiddleware.verifyRole("Customer");
  static VerifyOwner = UserVerifyMiddleware.verifyRole("Owner");
  static VerifyChief = UserVerifyMiddleware.verifyRole("Chief");
  static VerifyWaiter = UserVerifyMiddleware.verifyRole("Waiter");

  static VerifyUser = (req, res, next) => {
    const authHeader = req.header("Authorization");
    const token = authHeader;
    if (token == null) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      jwt.verify(token, process.env.JWT_TOKEN, async (err, decodedToken) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden" });
        }
        try {
          const userID = decodedToken.userID;
          const user = await User.FindByID(userID);
          if (user) {
            req.user = user;
            next();
          } else {
            return res.status(404).json({ message: "User does not exist" });
          }
        } catch (error) {
          console.error("Error in VerifyUser:", error);
          return res.status(500).json({ message: "Internal Server Error" });
        }
      });
    } catch (error) {
      console.error("Error in JWT verification:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
}

module.exports = UserVerifyMiddleware;
