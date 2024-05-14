async function getMe(token) {
  try {
    const response = await fetch('https://10.120.32.94/restaurant/api/v1/users/token', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
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

async function putUser(user) {
  console.log(user);
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('https://10.120.32.94/restaurant/api/v1/users', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(user)
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null; // Return null in case of error
  }
}

async function addAvatar(avatar) {
  const token = localStorage.getItem('token');
  try {
    const response = await fetch('https://10.120.32.94/restaurant/api/v1/users/avatar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: avatar
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null; // Return null in case of error
  }
}



async function fillProfile() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You must be logged in to view this page')
    window.location.href = 'index.html';
    return;
  }

  const me = await getMe(token);
  if (!me) {
    return;
  }

  document.getElementById('profile-Username').value = me.username;
  document.getElementById('profile-Password').value = me.password;
  document.getElementById('profile-Email').value = me.email;
}

async function modifyUser() {
  const username = document.getElementById('profile-Username').value;
  const password = document.getElementById('profile-Password').value;
  const email = document.getElementById('profile-Email').value;
  const error = document.getElementById('error');

  if (!username || !password || !email) {
    alert('Please fill in all fields');
    return;
  }

  if (username) {
    const available = await fetchUsernameAvailability(username);
    if (!available) {
      document.getElementById('profile-Username').classList.add('unavailable');
      error.style.display = 'block';
      error.innerHTML = 'Username not available';
      error.style.color = 'red';
      return;
    } else {
      document.getElementById('profile-Username').classList.remove('unavailable');
      error.style.display = 'none';
    }
  }

  const user = {
    username,
    password,
    email
  };

  console.log(user);

  const response = await putUser(user);

  if (response) {
    alert('User profile updated');
    //window.location.href = 'index.html';
  } else {
    alert('Error updating user profile');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  fillProfile();
  const form = document.querySelector('#profileForm');
  form.addEventListener('submit', async function(event) {
    event.preventDefault();
    modifyUser();
  });
});


