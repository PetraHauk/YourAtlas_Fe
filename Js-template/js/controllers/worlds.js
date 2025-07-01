import { getCardTotalWidth, printUsername, renderWorlds } from "../renders/frontPageRender.js";
import { mockWorlds } from "../fetches/mockdata/worlds.js";
import { registerWorld } from "../fetches/create-world.js";

let currentIndex = 0; // for scroll wheel

export function appendCreateNewWorld(worlds) {
  return [
    {
      id: "__create__",
      name: "Create new world",
      image: "../images/new-world-icon.png",
      isCreate: true,
    },
    ...worlds,
  ];
}

export function scrollWorlds(direction, totalCards, visibleCards = 3) {
  const wrapper = document.querySelector(".world-list");
  if (!wrapper) return;

  const maxIndex = totalCards - visibleCards;

  currentIndex += direction;

  if (currentIndex > maxIndex) currentIndex = 0;
  else if (currentIndex < 0) currentIndex = maxIndex;

  const cardWidth = getCardTotalWidth();
  const offset = currentIndex * cardWidth;
  wrapper.style.transform = `translateX(-${offset}px)`;
}

export function setupEventListeners() {
  let allWorlds = [];

  document.addEventListener("DOMContentLoaded", () => {
    printUsername();

    // For now using mock data:
    allWorlds = appendCreateNewWorld(mockWorlds);
    renderWorlds(allWorlds);

    document.getElementById("scroll-left").addEventListener("click", () => {
      scrollWorlds(-1, allWorlds.length);
    });

    document.getElementById("scroll-right").addEventListener("click", () => {
      scrollWorlds(1, allWorlds.length);
    });

    const postWorldBTN = document.getElementById("input-newest-world");
    if (postWorldBTN) {
      postWorldBTN.addEventListener("click", (e) => {
        e.preventDefault();
        registerWorld();
      });
    }
  });
}
