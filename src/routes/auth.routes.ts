import { Router } from "express";
import {
  LoginUserAuth,
  RegisterUserAuth,
} from "../controllers/Auth.controller";

const router = Router();

// Routes
router.post("/auth", LoginUserAuth);
router.post("/auth/signup", RegisterUserAuth);

export default router;
