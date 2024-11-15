const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  isPinned: { type: Boolean, default: false },
  tags: { type: [{id: String, text: String}], required: false },
  date: { type: Date, default: new Date().getTime()},
});

module.exports = mongoose.model("Note", noteSchema); 