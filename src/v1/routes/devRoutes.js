const express = require("express");
const router = express.Router();

router.all("/echo", (req, res) => {
  res.json(req.body);
});

module.exports = router;
