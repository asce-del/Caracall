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

// api/friends/addFriend/
router.post("/addFriend/", async (req, res) => {
  try {
    const { currentUserId, userFriendId } = req.body;

    const checkIfExist = await User.findOne({ friends: userFriendId });
    var friendToAdd = null;

    User.findById(userFriendId, function (err, user) {
      friendToAdd = user;
    });

    if (checkIfExist) {
      return res.status(400).json({ message: "Friend already added" });
    }

    User.updateOne({ _id: currentUserId }, { $push: { friends: userFriendId } })
      .then(() =>
        res.status(201).json({ message: "User added", user: friendToAdd })
      )
      .catch((err) => res.status(201).json({ message: "User isn`t added" }));
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "An error occurred" });
  }
});

// api/friends/deleteFriend/
router.delete("/deleteFriend/:id", async (req, res) => {
  try {

    const {currentUserId} = req.body;

    const checkIfExist = await User.findOne({ friends: req.params.id });
    var friendToDelete = null;

    User.findById(req.params.id , function (err, user) {
      friendToDelete = user;
    });

    if (!checkIfExist) {
      return res.status(400).json({ message: "Dont exist" });
    }

    User.updateOne({ _id: currentUserId }, { $pull: { friends: req.params.id } })
      .then(() =>
        res.status(201).json({ message: "User deleted", user: friendToDelete })
      )
      .catch((err) => res.status(201).json({ message: "User isn`t deleted" }));
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "An error occurred" });
  }
})

module.exports = router;
