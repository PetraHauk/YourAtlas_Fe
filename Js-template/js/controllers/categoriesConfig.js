import { mockArticles } from "../fetches/mockdata/articles.js";
import { mockCast } from "../fetches/mockdata/characters.js";
import { mockLocations } from "../fetches/mockdata/locations.js";

export const categoriesConfig = {
  characters: {
    title: 'Characters',
    getItems: (world) => {
      const relevantArticles = mockArticles.filter(
        a => a.world_id === world.id && a.type === 'Cast'
      );
      const relevantIds = relevantArticles.map(a => a.article_id);
      return mockCast.filter(cast => relevantIds.includes(cast.article_id));
    }
  },
  locations: {
    title: 'Locations',
    getItems: (world) => {
      const relevantArticles = mockArticles.filter(
        a => a.world_id === world.id && a.type === 'Location'
      );
      const relevantIds = relevantArticles.map(a => a.article_id);
      return mockLocations.filter(loc => relevantIds.includes(loc.article_id));
    }
  },
  systems: { title: 'Systems', getItems: () => [] },
  events: { title: 'Events', getItems: () => [] },
  organizations: { title: 'Organizations', getItems: () => [] },
  general: { title: 'General', getItems: () => [] }
};
