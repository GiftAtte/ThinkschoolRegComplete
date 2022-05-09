const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.ObjectId,
      ref: "Student",
      required: [true, "score must belong to a student"],
    },
    cbt: {
      type: mongoose.ObjectId,
      ref: "Cbt",
      required: [true, "CBT must be specified"],
    },
    scores: [
      {
        question: {
          type: mongoose.Schema.ObjectId,
          ref: "Question",
        },
        selectedOption: String,
        isCorrect: {
          type: Boolean,
          required: true,
        },
      },
    ],

    totalScore: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


scoreSchema.pre(/^find/, function () {
    this.populate({
        path: 'student',
        select: 'surnam firstName gender'

    })
        .populate({
            path: 'cbt',
            select:'name level'
    })
})






module.exports=scoreSchema=mongoose.model('Score',scoreSchema)