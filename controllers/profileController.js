import cloudinary from 'cloudinary';
import { StatusCodes } from "http-status-codes";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Profile } from "../models/profileModel.js";
const { v2: cloudinaryV2 } = cloudinary;

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dp3hsqngf",
  api_key: 189886163665759,
  api_secret: "g55P_hmQthgUXhkEDFLxmKTs1ug",
  secure: true,
});

// Cloudinary storage configuration for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "profiles",
    allowed_formats: ["jpg", "jpeg", "png", "avif", "webp"],
  },
});

const upload = multer({ storage: storage });
// Cloudinary configuration
cloudinary.config({
  cloud_name: "dp3hsqngf",
  api_key: 189886163665759,
  api_secret: "g55P_hmQthgUXhkEDFLxmKTs1ug",
  secure: true,
});



// POST Profile
const createProfile = async (req, res) => {
  try {
    const { name, age, gender, qualification, occupation, maritalStatus, caste, district, state } = req.body;

    if (
      !name || !age || !gender || !qualification || !occupation || !maritalStatus || !caste || !district || !state
    ) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    console.log(req.file)
    if (req.file) {
      const imageUrl = req.file.path; // Cloudinary URL

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
        images: imageUrl
      });

      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Profile created successfully",
        profile,
      });
    } else {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Image file is required",
      });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// GET Profiles
const getProfile = async (req, res) => {
  try {
    const profiles = await Profile.find();

    if (profiles.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No profiles found" });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      profiles,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE Profile
const deleteProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Profile.findByIdAndDelete(id);

    if (!profile) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// SEARCH Profiles
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
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Server error",
      error,
    });
  }
};

export { createProfile, deleteProfile, getProfile, searchProfile, upload };
