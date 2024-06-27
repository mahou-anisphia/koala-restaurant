class UserController {
  static Login = (req, res) => {
    return res.status(200).json({ message: "Login" });
  };
  static ChangePassword = (req, res) => {
    return res.status(200).json({ message: "Change Password" });
  };
}

module.exports = UserController;
