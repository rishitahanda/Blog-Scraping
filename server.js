require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const Article = require("./models/Article");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// GET all articles
app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

// CREATE article (for Phase 2)
app.post("/articles", async (req, res) => {
  const article = await Article.create(req.body);
  res.json(article);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
