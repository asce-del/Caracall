const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

// api/session/
router.get("/", async (req, res) => {
  try {
    // console.log(req.session)
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
