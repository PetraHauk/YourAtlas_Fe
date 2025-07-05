// ------ Print Username -------

export function printUsername() {
  const heading = document.querySelector(".your-username");
  if (!heading) return;
  const username = localStorage.getItem("username") || "Guest";
  heading.innerHTML = `${username}`;
}

// --------- Basic page logic ---------

export function renderWorlds(worlds) {
  const worldsContainer = document.getElementById("world-list");
  if (!worldsContainer) return;

  worldsContainer.innerHTML = "";

  worlds.forEach(world => {
    const li = document.createElement("li");
    li.className = "world-item";

    const itemContainer = document.createElement("div");
    itemContainer.className = "world-item-container";

    // New World card logic
    if (world.isCreate) {
      itemContainer.classList.add("create-new");
      // Opens the Modal. Look below for the modal visibility logic
      itemContainer.addEventListener("click", () => {
        openCreateWorldModal();
      });

    } else {
      itemContainer.addEventListener("click", () => {
        window.location.href = `world.html?id=${world.id}`;
      });
    }

    const imageDiv = document.createElement("div");
    imageDiv.className = "world-item-image";

    const image = document.createElement("img");

    // World picture Image handling
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

// -------- Get the exact card width for the scroller -----------

export function getCardTotalWidth() {
  const card = document.querySelector(".world-item");
  if (!card) return 0;
  const style = window.getComputedStyle(card);
  const width = card.offsetWidth;
  const marginLeft = parseFloat(style.marginLeft);
  const marginRight = parseFloat(style.marginRight);
  return width + marginLeft + marginRight;
}

// ------- Modal Opening and Closing logic (Hides and shows it using CSS) -------

function openCreateWorldModal() {
  const modal = document.querySelector(".createWorldModale");
  modal.style.display = "flex";

  function handleClickOutside(event) {
    if (event.target === modal) {
      modal.style.display = "none";
      modal.removeEventListener("click", handleClickOutside);
    }
  }

  modal.addEventListener("click", handleClickOutside);
}
