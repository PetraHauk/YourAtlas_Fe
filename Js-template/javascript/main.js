const urlParams = new URLSearchParams(window.location.search);
const restaurantId = urlParams.get('id');

// Fetch and display menu details based on the restaurant ID
async function fetchWeeklyMenu(id) {
  try {
    const response = await fetch(`https://10.120.32.94/restaurant/api/v1/restaurants/weekly/${id}/fi`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null; // Return null in case of error
  }
}

function displayTodayMenu(menuData) {
  // Get today's date
  const today = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const todayDateString = today.toLocaleDateString('fi-FI', options);

  // Find today's menu in menuData.days array
  const todayMenu = menuData.days.find(day => day.date === todayDateString);

  console.log('todayDate', todayDateString);
  console.log('todayMenu', todayMenu);

  // Display today's menu details on the page
  const menuElement = document.getElementById('today');
  if (todayMenu) {
    menuElement.innerHTML = `
      <h3>${todayDateString}</h3> <!-- Corrected variable name -->
      <ul>
        ${todayMenu.courses.map((course) => `
          <li>
            <h5>${course.name}</h5>
            <p>Diets: ${course.diets}</p>
            <p>Price: ${course.price}</p>
          </li>
        `).join('')}
      </ul>
    `;
  } else {
    menuElement.innerHTML = '<p>No menu available for today.</p>';
  }
}



function displayWeeklyMenu(menuData) {
  const days = menuData.days; // Access the 'days' property

  const menuElement = document.createElement('div');
  menuElement.className = 'menu';

  if (days.length === 0) {
    menuElement.innerHTML = '<p>No menu available for this week.</p>';
    return;
  }

  days.forEach((day) => {
    const dayElement = document.createElement('div');
    dayElement.className = 'day';
    dayElement.innerHTML = `
      <h3>${day.date}</h3>
      <ul>
        ${day.courses.map((course) => `
          <li>
            <h5>${course.name}</h5>
            <p>Diets: ${course.diets}</p>
            <p>Price: ${course.price}</p>
          </li>
        `).join('')}
      </ul>
    `;
    menuElement.appendChild(dayElement); // Append dayElement to menuElement
  });

  document.getElementById('weekly').appendChild(menuElement);
}


fetchWeeklyMenu(restaurantId).then((data) => {
  displayTodayMenu(data);
  displayWeeklyMenu(data);
});
