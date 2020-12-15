const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

// api/session/
router.get("/", async (req, res) => {
  try {
    if (req.session.isAuth === true && req.session.user) {
      res.status(200).json({
        name: req.session.user.name,
        isAuthenticated: true,
        userId: req.session.user._id,
        message: "User exist",
      });
    } else {
      res.status(404).json({
        message: "Session not found",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
