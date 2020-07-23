const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historyChatSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    history: { type: Array },
  },
  { collection: "historyChat" }
);

const historyChat = mongoose.model("historyChat", historyChatSchema);

module.exports = historyChat;
