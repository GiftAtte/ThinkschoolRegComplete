const mongoose = require('mongoose');


const cbtSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Cbt title is require"],
  },
  level: {
    type: mongoose.Schema.ObjectId,
    ref: "Level",
  },
  instruction: {
    type: String,
    required: [true, "Please provide instruction on this cbt"],
  },
  timeAllocated: {
    type: String,
    required: [true, "please provide how logn this test should last"],
  },
  validityPeriod: 
    [  {
      startDate: Date,
      endDate: Date
        }
    ],
    
    
  venue:String
});


cbtSchema.pre(/^find/, function () {
    this.populate({
        path: 'level',
        select: 'name'

    })
})

module.exports = mongoose.model('Cbt', cbtSchema);

