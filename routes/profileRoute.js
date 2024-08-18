import { Router } from "express";
import { createProfile, deleteProfile, getProfile, searchProfile, upload } from "../controllers/profileController.js";
const ProfileRouter = Router();
ProfileRouter.get("/all-profiles", getProfile);
ProfileRouter.post("/create-profile",upload.single("images"), createProfile);
ProfileRouter.delete("/delete-profile/:id", deleteProfile);
ProfileRouter.get("/search-profile", searchProfile);
export { ProfileRouter };
