const mongoose = require("mongoose");
const { isEmail } = require("validator");

async function validateEmail(email) {
  if (!isEmail(email)) throw new Error("Please enter a valid email address.");
  const user = await this.constructor.findOne({ email });
  if (user)
    throw new Error("A user is already registered with this email address.");
}

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is Required"],
    maxLength: 50,
  },

  email: {
    type: String,
    trim: true,
    unique: [true, "Email already exists"],
    required: [true, "Email is Required"],
    validate: validateEmail,
  },

  password: {
    type: String,
    required: [true, "Password is Required"],
    minLength: [8, "Password too short"],
  },
});

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
