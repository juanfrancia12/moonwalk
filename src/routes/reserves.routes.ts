import { Router } from "express";
import { createReserve, getReserves } from "../controllers/Reserve.controller";

const router = Router();

// Routes
router.post("/", createReserve);
// router.put("/:id", updateFood);
// router.delete("/:id", deleteFood);
router.get("/", getReserves);
// router.get("/:id", getFood);

export default router;
