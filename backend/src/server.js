import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDistPath = path.resolve(__dirname, "../../frontend/dist");
const isProduction = process.env.NODE_ENV === "production";
const configuredOrigins = (process.env.CLIENT_URLS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
if (process.env.FRONTEND_URL?.trim()) {
  configuredOrigins.push(process.env.FRONTEND_URL.trim());
}
const allowedOrigins = [...new Set(configuredOrigins)];
const defaultDevOrigins = ["http://localhost:5173", "http://127.0.0.1:5173"];
const corsOrigins =
  allowedOrigins.length > 0 ? allowedOrigins : isProduction ? [] : defaultDevOrigins;

if (isProduction && corsOrigins.length === 0) {
  throw new Error(
    "CORS is not configured. Set FRONTEND_URL or CLIENT_URLS in backend environment."
  );
}

/**
 * Middleware
 */
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || corsOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false, limit: "5mb" }));
app.use(helmet());

// Logging (only in development)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/**
 * Routes
 */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Keep Clone API is running 🚀",
  });
});
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API healthy",
    uptime: process.uptime(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.all(/^\/socket\.io(\/.*)?$/, (req, res) => {
  res.status(204).end();
});

if (isProduction && fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    return res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

/**
 * Error Handling Middleware
 */
app.use(notFound);
app.use(errorHandler);

/**
 * Start Server
 */
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});

/**
 * Graceful shutdown
 */
process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully.");
  server.close(() => process.exit(0));
});

