const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use("/api/students", require("./routes/studentRoutes"));

app.get("/", (req, res) => {
  res.send("✅ API Running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
