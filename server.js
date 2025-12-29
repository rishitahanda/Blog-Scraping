require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Article = require("./models/Article");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

/* 🔥 Disable buffering so errors show immediately */
mongoose.set("bufferCommands", false);

/* 🔥 Connect using async/await */
async function startServer() {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection FAILED:", err.message);
    process.exit(1);
  }
}

startServer();

/* ✅ Routes */
app.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find({});
    res.json(articles);
  } catch (err) {
    console.error("Query error:", err.message);
    res.status(500).json({ error: err.message });
  }
});
