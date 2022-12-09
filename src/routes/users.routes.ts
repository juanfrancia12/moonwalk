import { Router } from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUsers,
  getUser,
} from "../controllers/User.controller";

const router = Router();

// Routes
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/", getUsers);
router.get("/:id", getUser);

export default router;
