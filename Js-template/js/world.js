import { fetchMockWorldData } from "./fetches/worldFetches.js";
import { renderWorld } from "./renders/worldRender.js";

const params = new URLSearchParams(window.location.search);
const worldId = parseInt(params.get("id"));

document.addEventListener('DOMContentLoaded', async () => {
  const world = await fetchMockWorldData(worldId);
  renderWorld(world);
});
