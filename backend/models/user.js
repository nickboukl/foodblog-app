const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required field"],
    max: 20,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { 
    type: String, 
    required: [true, 'Password is required field'],
    max:20
  },
  name: {
    type: String,
    required: [true, 'Name is required field'],
    max: 20
  },
  lastname: {
    type: String,
    required: [ true, 'Lastname is required field'],
    max: 20
  },
  email: {
    type: String,
    required: [ true, 'Email is required field'],
    max: 20,
    unique:true,
    trim: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ["admin", "editor", "user"],
    default: "user"
  }
}, { timestamps: true })


module.exports = mongoose.model("User", userSchema);