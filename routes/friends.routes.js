const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");

// api/friends/
router.get("/", async (req, res) => {
  try {
    User.find({
      $and: [
        { $text: { $search: req.query.q } },
        { _id: { $ne: req.query.id } },
      ],
    }).exec((err, users) => {
      if (err) return res.status(400).send(err);
      res.status(200).send(users);
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
