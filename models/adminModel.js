import mongoose from "mongoose";
import isEmail from "validator/lib/isEmail.js";

const userModel = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    minLength: [3, "Email should be more than 3 characters"],
    maxLength: [25, "Email should be less than 15 characters"],
    unique: true,
    validate: {
      validator: isEmail,
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password should be more than 6 characters"],
  },
});

const User = mongoose.model("User", userModel);

export default User;
