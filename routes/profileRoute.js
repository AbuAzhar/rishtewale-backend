import { Router } from "express";
import { createProfile, deleteProfile, getProfile, searchProfile, singleProfile, updateProfile, upload } from "../controllers/profileController.js";
const ProfileRouter=Router();ProfileRouter.get("/all-profiles",getProfile),ProfileRouter.post("/create-profile",upload.single("images"),createProfile),ProfileRouter.delete("/delete-profile/:id",deleteProfile),ProfileRouter.get("/search-profile",searchProfile),ProfileRouter.put("/update-profile/:id",upload.single("images"),updateProfile),ProfileRouter.get("/profile/:id",singleProfile);export { ProfileRouter };
