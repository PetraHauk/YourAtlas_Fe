import { mockWorlds } from "./mockdata/worlds.js";
import { appendCreateNewWorld } from "../controllers/worlds.js";

// MOCKDATA
export function fetchMockWorldData(id) {
  return new Promise((resolve) => {
    const world = mockWorlds.find(w => w.id === id);
    resolve(world);
  });
}

// REAL ONE
export async function fetchWorlds() {
  const res = await fetch("/api/worlds");
  if (!res.ok) throw new Error("Failed to fetch worlds");
  const worlds = await res.json();
  return appendCreateNewWorld(worlds);
}


