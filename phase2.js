require("dotenv").config();
const axios = require("axios");
const cheerio = require("cheerio");
const mongoose = require("mongoose");
const OpenAI = require("openai");
const Article = require("./models/Article");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function scrapeContent(url) {
  try {
    const res = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(res.data);
    let text = "";

    $("p").each((_, el) => {
      text += $(el).text() + " ";
    });

    return text.slice(0, 2000);
  } catch {
    return "";
  }
}

async function runPhase2() {
  await mongoose.connect(process.env.MONGO_URI);

  const articles = await Article.find();

  for (const article of articles) {
    const searchUrl = `https://serpapi.com/search.json?q=${encodeURIComponent(
      article.title
    )}&api_key=${process.env.SERPAPI_KEY}`;

    const searchRes = await axios.get(searchUrl);
    const results = searchRes.data.organic_results?.slice(0, 2) || [];

    const refs = [];
    for (const r of results) {
      if (r.link) refs.push({ link: r.link, content: await scrapeContent(r.link) });
    }

    const prompt = `
Rewrite the article using the reference content below.
Keep it original, well-structured, and informative.

Original Article:
${article.content}

Reference Articles:
${refs.map(r => r.content).join("\n")}

Add a References section with these links:
${refs.map(r => r.link).join("\n")}
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    await Article.create({
      title: article.title + " (Updated)",
      content: completion.choices[0].message.content,
      sourceUrl: "AI-Enhanced",
    });
  }

  mongoose.disconnect();
}

runPhase2();
