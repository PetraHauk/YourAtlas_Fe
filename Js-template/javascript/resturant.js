let restaurants; // Declare restaurants globally

async function fetchRestaurants() {
  try {
    const response = await fetch('https://10.120.32.94/restaurant/api/v1/restaurants');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return []; // Return empty array in case of error
  }
}

async function createRestaurantList(restaurants) {
  const restaurantList = document.getElementById('restaurant-list');
  restaurantList.innerHTML = ''; // Clear previous content
  restaurants.forEach((restaurant) => {
    const restaurantElement = document.createElement('li');
    restaurantElement.className = 'ravintola';
    restaurantElement.innerHTML = `
      <h3>${restaurant.name}</h3>
      <p class="address">${restaurant.address}</p>
      <p class="city">${restaurant.postalCode}, ${restaurant.city}</p>
      <a href="menu.html?id=${restaurant._id}" class="menuButton">Näytä menu</a>
    `;
    restaurantList.appendChild(restaurantElement);
  });
}

function createFilterOptions() {
  const cities = restaurants.map((restaurant) => restaurant.city);
  const uniqueCities = [...new Set(cities)]; // Remove duplicates
  uniqueCities.sort();
  const citySelect = document.getElementById('city');

  const defaultOption = document.createElement('option');
  defaultOption.value = 'default';
  defaultOption.textContent = 'Kaikki kaupungit';
  citySelect.appendChild(defaultOption);

  uniqueCities.forEach((city) => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    citySelect.appendChild(option);
  });
}

async function filterByCity() {
  const selectedCity = document.getElementById('city').value;

  if (selectedCity === 'default') {
    // Reset to default setting (show all restaurants)
    const allRestaurants = await fetchRestaurants();
    createRestaurantList(allRestaurants);
    return;
  }

  const filteredRestaurants = restaurants.filter((restaurant) => restaurant.city === selectedCity);
  createRestaurantList(filteredRestaurants);
}

// Initial population of restaurant list and filter options
fetchRestaurants().then((data) => {
  restaurants = data; // Assign fetched data to the global variable
  createFilterOptions(); // Create filter options
  createRestaurantList(restaurants); // Create restaurant list
});
