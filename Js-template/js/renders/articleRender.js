export function renderArticle(article, extraData = null) {
  switch (article.type) {
    case "Cast":
      return renderCharacterArticle(article, extraData);
    case "Location":
      return renderLocationArticle(article, extraData);
    default:
      return renderGeneralArticle(article);
  }
}

function renderCharacterArticle(article, character) {
  const title = document.querySelector('#page-container h2');
  const content = document.querySelector('.article-content');
  const sideInfo = document.querySelector('.article-sidebox-info');

  if (!character) {
    document.getElementById('page-container').innerHTML = `<p>Character not found.</p>`;
    return;
  }

  title.textContent = article.name;

  content.innerHTML = `
    <p><strong>Appearance:</strong> ${character.appearance}</p>
  `;

  sideInfo.innerHTML = `
    <p><strong>Role:</strong> ${character.role}</p>
    <p><strong>Age:</strong> ${character.age}</p>
    <p><strong>Status:</strong> ${character.status}</p>
  `;
}

function renderLocationArticle(article, location) {
  const title = document.querySelector('#page-container h2');
  const content = document.querySelector('.article-content');
  const sideInfo = document.querySelector('.article-sidebox-info');

  if (!location) {
    document.getElementById('page-container').innerHTML = `<p>Location data not found.</p>`;
    return;
  }

  title.textContent = article.name;

  content.innerHTML = `
    <p><strong>History:</strong> ${location.history}</p>
    <p><strong>Culture:</strong> ${location.culture}</p>
  `;

  sideInfo.innerHTML = `
    <p><strong>Type:</strong> ${location.location_type}</p>
    <p><strong>Language:</strong> ${location.language}</p>
  `;
}

function renderGeneralArticle(article) {
  const container = document.getElementById('page-container');
  container.innerHTML = `
    <h1>${article.name}</h1>
    <p>No detailed view is available for this type yet.</p>
  `;
}
