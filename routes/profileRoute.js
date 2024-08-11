import express from "express";
import { createProfile, deleteProfile, getProfile, searchProfile, upload } from "../controllers/profileController.js";

const ProfileRouter = express.Router();

ProfileRouter.get("/all-profiles", getProfile);
ProfileRouter.post("/create-profile",upload.array("images",1),createProfile)
ProfileRouter.delete("/delete-profile/:id", deleteProfile);
ProfileRouter.get("/search-profile", searchProfile);

export { ProfileRouter };
