const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String },
    id: { type: String },
  },
  { collection: "user" }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
