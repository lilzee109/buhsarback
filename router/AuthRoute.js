import express from "express";
import { login, me, Logout } from "../controllers/Auih.js";

const router = express.Router();

router.get("/me", me);
router.post("/login", login);
router.delete("/logout", Logout);

export default router;