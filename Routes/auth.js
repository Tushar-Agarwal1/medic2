import express from "express";
import { login, logout, signUp, verifyAccount } from "../controllers/auth.controller.js";
const router = express.Router();

// router.get("/api/auth/login",login);
// router.get("/api/auth/signup",signin);
// router.get("/api/auth/logout",logout);
router.post("/login", login);
router.post("/signup", signUp);
router.post("/logout", logout);
router.get("/", (req, res) => {
    res.send("hiii");
})
router.post("/verifyAccount", verifyAccount);


export default router;
