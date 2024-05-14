async function postNewUser(user) {
  try {
    const response = await fetch('https://10.120.32.94/restaurant/api/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null; // Return null in case of error
  }
}


async function fetchUsernameAvailability(username) {
  try {
    const response = await fetch(`https://10.120.32.94/restaurant/api/v1/users/available/${username}`);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data.available;
    } else {
      // Handle non-200 status codes
      console.error('Error:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null; // Return null in case of error
  }
}

async function createUser() {
  const username = document.getElementById('newuser').value;
  const password = document.getElementById('newpassword').value;
  const email = document.getElementById('email').value;

  if (!username || !password || !email) {
    alert('Please fill in all fields');
    return;
  }

  if (username) {
    const available = await fetchUsernameAvailability(username);
    const error = document.getElementById('error');
    if (!available) {
      document.getElementById('profile-Username').classList.add('unavailable');
      error.style.display = 'block';
      error.innerHTML = 'Username not available';
      error.style.color = 'red';
      return;
    } else {
      document.getElementById('newuser').classList.remove('unavailable');
      error.style.display = 'none';
    }
  }

  const user = {
    username,
    password,
    email
  };

  console.log(user);

  const response = await postNewUser(user);
  if (response) {
    window.location.href = 'index.html';
  } else {
    alert('Error creating user');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.newUserForm');
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    createUser();
  });
});

