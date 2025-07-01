import { categoriesConfig } from "../controllers/categoriesConfig.js";
import { mockArticles } from "../fetches/mockdata/articles.js";

export function renderWorld(world) {
  if (!world) {
    document.getElementById('world-name').innerText = 'World not found.';
    return;
  }

  document.getElementById("world-name").innerText = world.name;

  const categoryTitleElement = document.getElementById('category-title');

  Object.entries(categoriesConfig).forEach(([id, config]) => {
    const element = document.getElementById(id);
    if (!element) return;

    element.addEventListener('click', () => {
      categoryTitleElement.innerText = config.title;

      const items = config.getItems(world);
      renderCategoryItems(items);
    });
  });
}

export function renderCategoryItems(items) {
  const categoryItemsElement = document.querySelector('.category-items');
  categoryItemsElement.innerHTML = '';

  if (!items || items.length === 0) {
    categoryItemsElement.innerHTML = '<li>No items found.</li>';
    return;
  }

  items.forEach(item => {
    const article = mockArticles.find(a => a.article_id === item.article_id);
    const li = document.createElement('li');

    let secondary = '';
    if ('role' in item)  {
      secondary = item.role;
    } else if ('location_type' in item) {
      secondary = item.location_type;
    }

    li.innerHTML = `
      <div class="article-name">${article?.name || "Unknown"}</div>
      <div class="article-secondary">${secondary}</div>
    `;

    li.addEventListener('click', () => {
      updatePreviewBox(article, item);
    });

    categoryItemsElement.appendChild(li);
  });
}

export function updatePreviewBox(article, item) {
  const previewBox = document.querySelector('.article-preview-box');
  const image = document.getElementById('preview-image');
  const title = document.getElementById('preview-title');
  const desc = document.getElementById('preview-description');
  const button = document.getElementById('preview-button');

  title.textContent = article.name || 'Untitled';

  if ('appearance' in item) {
    desc.textContent = item.appearance;
  } else if ('history' in item) {
    desc.textContent = item.history;
  } else {
    desc.textContent = 'No additional details available.';
  }

  button.onclick = () => viewArticle(article.article_id);
  previewBox.style.display = 'flex';
}

function viewArticle(articleId) {
  window.location.href = `article.html?articleId=${articleId}`;
}
