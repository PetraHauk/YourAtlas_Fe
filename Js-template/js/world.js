import { mockArticles } from "../mockdata/articles.js";
import { mockWorlds } from "../mockdata/worlds.js";
import { mockCast } from "../mockdata/characters.js";
import { mockLocations } from "../mockdata/locations.js";

// Get world ID from query string
const params = new URLSearchParams(window.location.search);
const worldId = parseInt(params.get("id"));

function fetchWorldData(id) {
  return new Promise((resolve) => {
    const world = mockWorlds.find(w => w.id === id);
    resolve(world);
  });
}

function renderWorld(world) {
  console.log("Rendering world:", world);

  if (!world) {
    document.getElementById('world-name').innerText = 'World not found.';
    return;
  }

  document.getElementById("world-name").innerText = world.name;

  const categoryTitleElement = document.getElementById('category-title');

  const categories = {
    characters: 'Characters',
    locations: 'Locations',
    system: 'System',
    events: 'Events',
    organizations: 'Organizations',
    general: 'General'
  };

  Object.entries(categories).forEach(([id, title]) => {
    const element = document.getElementById(id);
    if (element) {
      element.addEventListener('click', () => {
        categoryTitleElement.innerText = title;

        if (id === 'characters') {
          const relevantArticles = mockArticles.filter(
            a => a.world_id === world.id && a.type === 'Cast'
          );

          const relevantCharacterIds = relevantArticles.map(a => a.article_id);

          const charactersForWorld = mockCast.filter(
            cast => relevantCharacterIds.includes(cast.article_id)
          );

          renderCategoryItems(charactersForWorld);
        }

        else if (id === 'locations') {
          const relevantArticles = mockArticles.filter(
            a => a.world_id === world.id && a.type === 'Location'
          );

          const relevantLocationIds = relevantArticles.map(a => a.article_id);

          const locationsForWorld = mockLocations.filter(
            loc => relevantLocationIds.includes(loc.article_id)
          );

          renderCategoryItems(locationsForWorld);
        }
      });
    }
  });
}


function renderCategoryItems(items) {
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
      secondary = `${item.role}`;
    } else if ('location_type' in item) {
      secondary = `${item.location_type}`;
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

function updatePreviewBox(article, item) {
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

document.addEventListener('DOMContentLoaded', async () => {
  const world = await fetchWorldData(worldId);
  renderWorld(world);
});
