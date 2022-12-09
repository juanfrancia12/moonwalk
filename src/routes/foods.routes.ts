import { Router } from "express";
import {
  createFood,
  updateFood,
  deleteFood,
  getFoods,
  getFood,
} from "../controllers/Food.controller";

const router = Router();

// Routes
router.post("/", createFood);
router.put("/:id", updateFood);
router.delete("/:id", deleteFood);
router.get("/", getFoods);
router.get("/:id", getFood);

export default router;
