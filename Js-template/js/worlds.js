import { mockWorlds } from "../mockdata/worlds.js";

// Function to print the username for the heading
function printUsername () {
  const heading = document.querySelector(".your-username");;
  const username = localStorage.getItem("username");
  heading.innerHTML = `${username}`;
}

// Function for posting a new world
function registerWorld() {
  //Get correct form
  const worldForm = document.querySelector('#postNewWorld');
  //Ger values
  const world_name = worldForm.querySelector('#new-world-name').value.trim();
  // SE NYT OTTAA DEFAULTTINA TON ONGOING MANUAALISESTI, EN JAKSANUT NYT MIETTII TOTA LOGIIKKAA ET SE OTTAA OIKEEN
  // JOS TESTAAT NI VALITSE AINA ONGOING
  const status = worldForm.querySelector('#Ongoing-story').value.trim();
  const user_id = localStorage.getItem('user_id')
  // Data for request
  const bodyData = {
      world_name: world_name,
      state: status
  };
  console.log(bodyData)
  // Endpoint
  const url = `http://localhost:3000/api/worlds/${user_id}`;
  let token = localStorage.getItem('authToken');
  // Options
  const options = {
      body: JSON.stringify(bodyData),
      method: 'POST',
      headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json',
      },
  };
  // Send a request for posting data
  const response = fetch(url, options);
  if (response.error) {
      console.error('Creating A New World Failed:', response.error);
      return;
    } else {
      alert('World was saved!')
    }
    worldForm.reset();
};

// THIS IS FOR THE MOCK DATA
function appendCreateNewWorld(worlds) {
  return [
    {
      id: "__create__",
      name: "Create new world",
      image: "../images/new-world-icon.png",
      isCreate: true
    },
    ...worlds,
  ];
}

// This would be the backend fetch request (for now)
function fetchWorldsAndRender() {
  fetch("/api/worlds")
    .then(res => res.json())
    .then(worlds => {
      // Append "create new world" card
      allWorlds = [{
        id: "__create__",
        name: "Create new world",
        image: "../images/new-world-icon.png",
        isCreate: true,
      }, ...worlds
      ];

      renderWorlds(allWorlds);
    });
}

let allWorlds = [];
let currentIndex = 0;

// Render the world cards
function renderWorlds(worlds) {
  const worldsContainer = document.getElementById("world-list");
  if (!worldsContainer) return;

  // Clear existing items if any
  worldsContainer.innerHTML = "";

  worlds.forEach(world => {
    const li = document.createElement("li");
    li.className = "world-item";

    const itemContainer = document.createElement("div");
    itemContainer.className = "world-item-container";

    if (world.isCreate) {
      itemContainer.classList.add("create-new");
      itemContainer.addEventListener("click", (e) => {
        // TÄNNE SE DOKUMENTIN AVAUS !!!
        alert('TODO: add new world item logic');
      });
    } else {
      itemContainer.addEventListener("click", (e) => {
        window.location.href = `world.html?id=${world.id}`;
      });
    }

    const imageDiv = document.createElement("div");
    imageDiv.className = "world-item-image";

    const image = document.createElement("img");

    if (!world.image || world.image === "none") {
      image.src = "../images/placeholder.png";
      image.classList.add("placeholder");
    } else if (world.isCreate) {
      image.src = world.image;
      image.classList.add("new-world-icon");
    } else {
      image.src = world.image;
    }

    imageDiv.appendChild(image);
    itemContainer.appendChild(imageDiv);

    const text = document.createElement("p");
    text.className = "world-item-text";
    text.innerText = world.name;
    itemContainer.appendChild(text);

    li.appendChild(itemContainer);
    worldsContainer.appendChild(li);
  });
}

// Helps the scroller to get the "correct" messurments to scroll to the next card
function getCardTotalWidth() {
  const card = document.querySelector(".world-item");
  const style = window.getComputedStyle(card);
  const width = card.offsetWidth;
  const marginLeft = parseFloat(style.marginLeft);
  const marginRight = parseFloat(style.marginRight);
  return width + marginLeft + marginRight;
}

// Scroller for the worlds
function scrollWorlds(direction) {
  const wrapper = document.querySelector(".world-list");
  const totalCards = allWorlds.length;
  const visibleCards = 3;
  const maxIndex = totalCards - visibleCards;

  currentIndex += direction;

  if (currentIndex > maxIndex) currentIndex = 0;
  else if (currentIndex < 0) currentIndex = maxIndex;

  const cardWidth = getCardTotalWidth();
  const offset = currentIndex * cardWidth;
  wrapper.style.transform = `translateX(-${offset}px)`;
}

// After loading the page.
document.addEventListener("DOMContentLoaded", () => {
  printUsername();
  allWorlds = appendCreateNewWorld(mockWorlds);
  renderWorlds(allWorlds);

  document.getElementById("scroll-left").addEventListener("click", () => scrollWorlds(-1));
  document.getElementById("scroll-right").addEventListener("click", () => scrollWorlds(1));
});

const postWorldBTN = document.getElementById("input-newest-world")
postWorldBTN.addEventListener("click", (e) => {
        e.preventDefault();
        registerWorld();
      });
