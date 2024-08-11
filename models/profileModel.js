import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Enter Name *"],
    trim: true,
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [2, "Name should be at least 2 characters"],
  },
  age: {
    type: Number,
    required: [true, "Enter Age *"],
    trim: true,
  },
  gender: {
    type: String,
    required: [true, "Enter Gender *"],
    trim: true,
    enum: {
      values: ["male", "female"],
      message: "Please select a valid gender",
    },
  },
  qualification: {
    type: String,
    required: [true, "Enter Qualification *"],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, "Enter Work *"],
    trim: true,
  },
  maritalStatus: {
    type: String,
    required: [true, "Enter Marital Status *"],
    trim: true,
    enum: {
      values: ["Married", "Unmarried", "Divorce"],
      message: "Please select a valid Marital Status",
    },
  },
  caste: {
    type: String,
    required: [true, "Enter Caste *"],
    trim: true,
  },
  district: {
    type: String,
    required: [true, "Enter District *"],
    trim: true,
  },
  state: {
    type: String,
    required: [true, "Enter State *"],
    trim: true,
  },
  images: {
    type: [String],
    required: [true, 'Enter Project Image'],
  },
});

const Profile = mongoose.model("Profile", profileSchema);
export { Profile };
