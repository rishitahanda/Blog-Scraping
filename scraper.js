require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const Article = require("./models/Article");

const MONGO_URI = process.env.MONGO_URI;

async function scrapeBlogs() {
  await mongoose.connect(MONGO_URI);
  console.log("MongoDB connected");

  const url = "https://beyondchats.com/blogs/";
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);

  const articles = [];

  $(".blog-card").each((_, element) => {
    const title = $(element).find("h3").text().trim();
    const content = $(element).find("p").text().trim();

    if (title && content) {
      articles.push({
        title,
        content,
        sourceUrl: url,
      });
    }
  });

  await Article.insertMany(articles);
  console.log("Articles saved to database");

  mongoose.disconnect();
}

scrapeBlogs();
