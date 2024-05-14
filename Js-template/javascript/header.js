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

function logout() {
  localStorage.removeItem('token');
  window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login'); // Changed selector to ID
  const newUserLink = document.querySelector('.newUserLink');
  const userInfoContainer = document.querySelector('.user-container');
  const logoutLink = document.getElementById('logout');

  const token = localStorage.getItem('token');
  if (token) {
    getMe(token).then(function(me) {
      if (me) {
        console.log(me);
        document.getElementById('usernameNav').textContent = me.username;
      }
    });
    loginForm.style.display = 'none';
    newUserLink.style.display = 'none';
    userInfoContainer.style.display = 'block';
  } else {
    loginForm.style.display = 'block';
    newUserLink.style.display = 'block';
    userInfoContainer.style.display = 'none';
  }

  logoutLink.addEventListener('click', function(event) {
    event.preventDefault();
    logout();
  });
});



