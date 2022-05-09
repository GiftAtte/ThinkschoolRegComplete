const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  surname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  otherNames: String,
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  contactAddress: {
    type: String,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  formerSchool: String,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A student must be a User!"],
  },
  school: {
    type: mongoose.Schema.ObjectId,
    ref: "School",
    required: [true, "Student must belong to a school"],
  },
  level: {
    type: mongoose.Schema.ObjectId,
    ref: "Level",
    required: [true, "You must select your intnded level"],
  },
});





module.exports = mongoose.model("Student", studentSchema);
