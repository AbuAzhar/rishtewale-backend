import { StatusCodes } from "http-status-codes";
import multer from "multer";
import { Profile } from "../models/profileModel.js";

// SET MULTER CONFIGRATION
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// GET-PROFILES
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.find();
    if (profile.length == 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No profile found" });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      profile,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// POST-PROFILES
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
      return res.status(StatusCodes.NOT_ACCEPTABLE).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    // console.log(req.files)

    // const images = req.files.map((file) => file.path);
    const images = req.files.map((file) => `/${file.path.replace(/\\/g, "/")}`);

    // console.log(images)

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
      images,
    });
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE PROFILE
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

const searchProfile = async (req, res) => {
  const { gender, maritalStatus, age, caste, state } = req.query;

  // Build the query object based on available criteria
  const query = {};

  if (gender) query.gender = gender;
  if (maritalStatus) query.maritalStatus = maritalStatus;
  if (age) query.age = { $gte: age.split('-')[0], $lte: age.split('-')[1] };
  if (caste) query.caste = caste;
  if (state) query.state = state;

  try {
      const profiles = await Profile.find(query);
      if (profiles.length > 0) {
          res.json({ success: true, profiles });
      } else {
          res.json({ success: false, message: 'No profiles found' });
      }
  } catch (error) {
      res.status(500).json({ success: false, message: 'Server error', error });
  }
};

export { createProfile, deleteProfile, getProfile, searchProfile, upload };
