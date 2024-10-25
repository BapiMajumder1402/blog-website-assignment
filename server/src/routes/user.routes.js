import { Router } from "express";
import {registerUser, logInUser,  getCurrentUser  } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/currentUser").get(getCurrentUser)
router.route("/register").post(registerUser)
router.route("/login").post(logInUser)
export default router;
