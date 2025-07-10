import express from "express";
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/authorization.controller.js";
import { protectedRoute } from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check",protectedRoute, checkAuth);

router.put("/update-profile",protectedRoute, updateProfile);


export default router;