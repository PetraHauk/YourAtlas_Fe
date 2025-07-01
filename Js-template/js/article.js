import { getArticleById } from "./fetches/articleFetches.js";
import { renderArticle } from "./renders/articleRender.js";

const params = new URLSearchParams(window.location.search);
const articleId = parseInt(params.get("articleId"), 10);
const article = getArticleById(articleId);

if (!article) {
  document.getElementById('page-container').innerHTML = `<p>Article not found.</p>`;
} else {
  renderArticle(article);
}
