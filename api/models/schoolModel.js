const mongoose = require('mongoose');



const schoolSchema= new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    shortName: {
        type: String,
        required: true,
        
    },
    location: {
        type: String,
        required: true,
        
    },
    state: {
        type: String,
        required
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim:true,
    },
    phoneNumber: {
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default:Date.now()
    }
})


schoolSchema.virtual("students", {
  ref: "Student",
  foreignField: "school",
  localField: "_id",
});

module.exports = mongoose.model('School', schoolSchema);