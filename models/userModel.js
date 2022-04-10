const mongoose = require("mongoose");
const validator = require("validator");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: true,
    min: [6, "Password must no be at least six characters long"],
  },
  confirmPassword: {
    type: String,
    required: true,
    match: this.password,
    validate: [
      {
        validator: function (el) {
          return el === this.password;
        },
        message: "password do not match",
      },
    ],
  },
  role: {
      type:String,
      enum: ["ADMIN", "STUDENT", "USER"],
    default:'USER',
  },
    createdAt: {
      type:Date,
    default: Date.now(),
    },
    photo: {
        type:String
    }
});



module.exports=mongoose.model('User',userSchema)