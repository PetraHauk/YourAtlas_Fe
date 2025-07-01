import { mockArticles} from "./mockdata/articles";
import { mockCast} from "./mockdata/characters";
import { mockLocations} from "./mockdata/locations";

export function getArticleById(articleId) {
  return mockArticles.find(article => article.article_id === articleId);
}

export function getCharacterByArticleId(articleId) {
  return mockCast.find(c => c.article_id === articleId);
}

export function getLocationByArticleId(articleId) {
  return mockLocations.find(l => l.article_id === articleId);
}
