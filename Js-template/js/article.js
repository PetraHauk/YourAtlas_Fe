import { loadFullArticle } from "./controllers/articleController.js";
import { renderArticle } from "./renders/articleRender.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const articleId = parseInt(params.get("articleId"), 10);

  try {
    const { article, extra } = await loadFullArticle(articleId);
    renderArticle(article, extra);
  } catch (err) {
    console.error(err);
    document.getElementById('page-container').innerText = `<p>${err.message}</p>`;
  }
});

