import express from "express";
import bodyParser from "body-parser";
import pollingRoutes from "./routes/pollingRoutes.js";
import path from "path";
import dotenv from "dotenv";
import { connectDB } from "./config/database.js";
import errorHandler from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const __dirname = path.resolve();

// Set view engine and views directory
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from uploads directory
app.use("/uploads", express.static( "uploads"));

// Routes
app.use("/polling", pollingRoutes);

// Root route
app.get("/", (req, res) => {
  res.redirect("/polling/select-state");
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route not found",
  });
});

// Start server
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    console.log(process.env.DB_HOST); // Check if environment variables are loaded

    // Start listening
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(
        `Swagger documentation available at http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
