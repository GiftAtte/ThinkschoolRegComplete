const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  cbt: {
    type: mongoose.Schema.ObjectId,
    required: [true, "Questions must be attached to exams"],
  },
  questionNo: {
    type: Number,
    required: true,
  },
  question: {
    type: String,
    required: [true, "Question must no be empty"],
  },
  options: [
    {
      A: {
        type: String,
        required: [true, "Question must contain atleast 2 options"],
      },
      B: {
        type: String,
        required: [true, "Question must contain atleast 2 options"],
      },
      C: String,
      D: String,
      E: String,
    },
  ],
  correctOption: {
    type: String,
      required: [true, "Please select the right option"],
    select:false,
  },
});

questionSchema.pre(/^find/, function () {
    this.populate({
        path: 'level',
        select: 'name'
    
    })
})
module.exports = mongoose.model("Question", questionSchema);
