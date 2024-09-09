import mongoose from "mongoose";
const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [!0, "Enter Name *"],
    trim: !0,
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [2, "Name should be at least 2 characters"],
  },
  age: { type: Number, required: [!0, "Enter Age *"] },
  gender: {
    type: String,
    required: [!0, "Enter Gender *"],
    trim: !0,
    enum: {
      values: ["male", "female"],
      message: "Please select a valid gender",
    },
  },
  qualification: {
    type: String,
    required: [!0, "Enter Qualification *"],
    trim: !0,
  },
  occupation: { type: String, required: [!0, "Enter Occupation *"], trim: !0 },
  maritalStatus: {
    type: String,
    required: [!0, "Enter Marital Status *"],
    trim: !0,
    enum: {
      values: ["Married", "Unmarried", "Divorce", "Widowed", "Seprate"],
      message: "Please select a valid Marital Status",
    },
  },
  caste: { type: String, required: [!0, "Enter Caste *"], trim: !0 },
  district: { type: String, required: [!0, "Enter District *"], trim: !0 },
  state: { type: String, required: [!0, "Enter State *"], trim: !0 },
  images: { type: String, required: [!0, "Image is required"] },
});
const Profile = mongoose.model("Profile", profileSchema);
export { Profile };
