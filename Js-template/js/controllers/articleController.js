import { getArticleById, getCharacterByArticleId, getLocationByArticleId } from '../fetches/articleFetches.js';

export async function loadFullArticle(articleId) {
  const article = await getArticleById(articleId);
  if (!article) throw 'Article not found.';

  let extra = null;

  switch (article.type) {
    case "Cast":
      extra = getCharacterByArticleId(article.article_id);
      break;
    case "Location":
      extra = getLocationByArticleId(article.article_id);
      break;
    case "Systems":
      break;
    case "General":
      break;
  }

  return { article, extra };
}


