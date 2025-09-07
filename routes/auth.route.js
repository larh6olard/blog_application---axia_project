import { Router } from "express";
import { login, user, register } from "../controllers/auth.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", auth, user);

export default router;
