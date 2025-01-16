const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courseName: { type: String, required: true },
  email: { type: String, default: null },
  number: { type: Number },
  grade: { type: String, default: "F" },
});

module.exports = mongoose.model("Student", studentSchema);
