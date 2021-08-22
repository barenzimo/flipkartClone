const express = require("express");
const router = express.Router();
const { signup, signin, requireSignin } = require("../controllers/auth.js");

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/profile", requireSignin, (req, res) => {
  res.json({ message: "Protected route" });
});
module.exports = router;
