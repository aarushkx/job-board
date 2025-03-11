import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import {
    register,
    login,
    logout,
    currentUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/current-user", protect, currentUser);

export default router;
