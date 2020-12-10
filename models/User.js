const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [
    {
      friend_id: { type: Types.ObjectId, ref: "User" },
      friend_name: { type: String, required: true },
      friend_email: { type: String, required: true },
    },
  ],
});

schema.index({ "$**": "text" });

module.exports = model("User", schema);
