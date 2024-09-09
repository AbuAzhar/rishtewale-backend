import { v2 as cloudinary } from "cloudinary";
import { StatusCodes } from "http-status-codes";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Profile } from "../models/profileModel.js";

cloudinary.config({
  cloud_name: "dp3hsqngf",
  api_key: "189886163665759",
  api_secret: "g55P_hmQthgUXhkEDFLxmKTs1ug",
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profiles",
    allowed_formats: ["jpg", "jpeg", "png", "avif", "webp"],
  },
});

const upload = multer({ storage });

// Create Profile Controller
const createProfile = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      qualification,
      occupation,
      maritalStatus,
      caste,
      district,
      state,
    } = req.body;

    if (
      !name ||
      !age ||
      !gender ||
      !qualification ||
      !occupation ||
      !maritalStatus ||
      !caste ||
      !district ||
      !state
    ) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Please fill all the fields" });
    }

    if (req.file) {
      const imageUrl = req.file.path;
      const profile = await Profile.create({
        name,
        age,
        gender,
        qualification,
        occupation,
        maritalStatus,
        caste,
        district,
        state,
        images: imageUrl,
      });

      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Profile created successfully",
        profile,
      });
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Image file is required" });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

// Get All Profiles Controller
const getProfile = async (req, res) => {
  try {
    const profiles = await Profile.find();
    if (profiles.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No profiles found" });
    }

    return res.status(StatusCodes.OK).json({ success: true, profiles });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

// Delete Profile Controller
const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByIdAndDelete(id);
    if (!profile) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Profile not found" });
    }

    // Delete image from Cloudinary
    const publicId = profile.images.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Profile deleted successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

// Update Profile Controller
const updateProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    if (!profile) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Profile not found" });
    }

    // Delete the old image from Cloudinary if a new image is uploaded
    if (req.file && profile.images) {
      const publicId = profile.images.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(publicId);
      req.body.images = req.file.path; // Update image path in request body
    }

    // Update the profile with the new data
    const updatedProfile = await Profile.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Profile updated successfully",
      updatedProfile,
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

// Single Profile Controller
const singleProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findById(id);
    if (!profile) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Profile not found" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Profile found", profile });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: error.message });
  }
};

// Search Profile Controller
const searchProfile = async (req, res) => {
  const { gender, maritalStatus, age, caste, state } = req.query;
  const query = {};
  if (gender) query.gender = gender;
  if (maritalStatus) query.maritalStatus = maritalStatus;
  if (age) query.age = { $gte: age.split("-")[0], $lte: age.split("-")[1] };
  if (caste) query.caste = caste;
  if (state) query.state = state;

  try {
    const profiles = await Profile.find(query);
    if (profiles.length > 0) {
      res.status(StatusCodes.OK).json({ success: true, profiles });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "No profiles found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Server error", error });
  }
};

export {
  createProfile,
  deleteProfile,
  getProfile,
  searchProfile,
  singleProfile,
  updateProfile,
  upload
};

