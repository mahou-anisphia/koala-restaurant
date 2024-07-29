const express = require("express");
const router = express.Router();

router.all("/echo", (req, res) => {
  res.json(req.body);
});
// router.all("/", (req, res) => {
//   res.json({ message: "It works! API is working" });
// });

module.exports = router;
