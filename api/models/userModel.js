const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const validator = require("validator");
const crypto = require("crypto");
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
    select: false,
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
    type: String,
    enum: ["ADMIN", "STUDENT", "USER"],
    default: "USER",
  },

  school: {
    type: mongoose.Schema.ObjectId,
    ref: "School",
    required: [true, "school is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  photo: {
    type: String,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.pre(/^find/, function () {
  this.populate({
    path: "school",
    select: "name email location",
  });
});

userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.passwordChanged = function (JWTTiat) {
  if (this.passwordChangedAt) {
    const timeStamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTTiat < timeStamp;
  }
  return false;
};

userSchema.methods.createPasswordRestToken=function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
