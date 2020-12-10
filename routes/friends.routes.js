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

// api/getUserFriends/:id
router.get("/getUserFriends/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (user) {
      res.status(200).json({
        friends: user.friends,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "An error occurred" });
  }
});

// api/friends/addFriend/
router.post("/addFriend/", async (req, res) => {
  try {
    const {
      currentUserId,
      userFriendId,
      userFriendEmail,
      userFriendName,
    } = req.body;

    const checkIfExist = await User.findOne({
      friends: { friend_id: userFriendId },
    });

    const friendToAdd = await User.findById(userFriendId);

    if (checkIfExist) {
      return res.status(400).json({ message: "Friend already added" });
    }

    User.updateOne(
      { _id: currentUserId },
      {
        $push: {
          friends: {
            friend_id: userFriendId,
            friend_email: userFriendEmail,
            friend_name: userFriendName,
          },
        },
      }
    )
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
router.post("/deleteFriend/", async (req, res) => {
  try {
    const { currentUserId, userFriendId } = req.body;

    console.log(req.body)

    const checkIfExist = await User.findOne({
      friends: { friend_id: userFriendId },
    });

    console.log(checkIfExist)

    const friendToDelete = await User.findById(userFriendId);

    if (!checkIfExist) {
      return res.status(400).json({ message: "Friend doesnt exist" });
    }

    User.updateOne(
      { _id: currentUserId },
      { $pull: { friends: { friend_id: userFriendId } } }
    )
      .then(() => res.status(201).json({ user: friendToDelete }))
      .catch((err) => console.log(err));
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "An error occurred" });
  }
});

module.exports = router;
