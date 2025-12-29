import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <h1>BeyondChats Articles</h1>

      {articles.map((article) => {
        const isUpdated = article.title.includes("(Updated)");

        return (
          <div
            key={article._id}
            className={`card ${isUpdated ? "updated" : "original"}`}
          >
            <div className="badge">
              {isUpdated ? "AI-Enhanced Article" : "Original Article"}
            </div>

            <h2>{article.title.replace("(Updated)", "")}</h2>
            <p>{article.content}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
