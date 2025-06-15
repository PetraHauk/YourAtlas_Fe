import {mockArticles} from "../mockdata/articles.js";
import { mockCast } from "../mockdata/characters.js";
import { mockLocations } from "../mockdata/locations.js";

const params = new URLSearchParams(window.location.search);
const articleId = parseInt(params.get("articleId"), 10);

const article = mockArticles.find(article => article.article_id === articleId);

if (!article) {
  document.getElementById('page-container').innerHTML = `<p>Article not found.</p>`;
} else {

  switch (article.type) {
    case "Cast":
      renderCharacterArticle(article);
      break;
    case "Location":
      renderLocationArticle(article);
      break;
    default:
      renderGeneralArticle(article);
  }
}

function renderCharacterArticle(article) {
  const character = mockCast.find(c => c.article_id === article.article_id);
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
    <p><strong>Backstory:</strong>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur pretium, sapien sed faucibus facilisis, nibh nulla posuere nunc, non dictum lorem lorem vitae lectus. Praesent commodo semper nulla, in malesuada urna bibendum eu. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum sit amet convallis nibh, a suscipit ex. Nullam vulputate ipsum sed eros pulvinar, et vulputate justo consectetur. Mauris vitae lectus ut justo dapibus laoreet. Sed dictum dui nec quam convallis, ut fermentum nisl mattis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur feugiat, metus sed maximus cursus, libero velit efficitur diam, quis lacinia erat massa at orci.
      </p>
      <p>
        Vivamus vel tincidunt erat. Aliquam erat volutpat. Quisque id dignissim velit. Praesent maximus velit sapien, a vulputate ex dapibus vel. Integer condimentum libero vel efficitur tincidunt. Nam dignissim nisi a purus bibendum, at vestibulum risus scelerisque. In accumsan suscipit metus, et cursus nulla condimentum nec.
      </p>
      <p>
        Suspendisse potenti. Mauris maximus, libero sed sodales hendrerit, elit lacus facilisis purus, eu dignissim lorem magna at tortor. Nullam facilisis semper diam, non feugiat nisl porttitor et. Etiam et purus at magna dapibus bibendum sed a erat. Vestibulum fringilla mi sit amet augue efficitur blandit.
      </p>
      </p>
  `;

  sideInfo.innerHTML = `
    <p><strong>Role:</strong> ${character.role}</p>
    <p><strong>Age:</strong> ${character.age}</p>
    <p><strong>Status:</strong> ${character.status}</p>
  `;
}

function renderLocationArticle(article) {
  const location = mockLocations.find(l => l.article_id === article.article_id);
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
