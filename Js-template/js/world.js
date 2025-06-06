import { mockArticles } from "../mockdata/articles.js";
import { mockCast } from "../mockdata/characters.js";
import { mockWorlds } from "../mockdata/worlds.js";

// Get world ID from query string
const params = new URLSearchParams(window.location.search);
const worldId = parseInt(params.get("id"));

function fetchWorldData(id) {
  // When switching to backend: return fetch(`/api/worlds/${id}`).then(res => res.json());
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


  // TODO: Render articles, cast, etc.
}

document.addEventListener('DOMContentLoaded', async () => {
  console.log(worldId);

  const world = await fetchWorldData(worldId);
  renderWorld(world);
});
