import cors from "cors";
import express from "express";
import morgan from "morgan";
import config from "./config";

import usersRoutes from "./routes/users.routes";
import foodsRoutes from "./routes/foods.routes";
import reservesRoutes from "./routes/reserves.routes";

const app = express();

// settings
app.set("PORT", config.port);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes
app.use("/api/users", usersRoutes);
app.use("/api/foods", foodsRoutes);
app.use("/api/reserves", reservesRoutes);

export default app;
