async function login(username, password) {
  const response = await fetch('https://10.120.32.94/restaurant/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const { user, token } = await response.json();
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    console.log('user', user);
    console.log('token', token);
    window.location.href = 'index.html';
  } else {
    alert('Incorrect username or password');
  }
}

async function getLoginParams(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username || !password) {
    alert('Please fill in all fields');
    return;
  }

  console.log('username', username);

  await login(username, password);
}

document.getElementById('login').addEventListener('submit', getLoginParams);
