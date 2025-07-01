

export async function fetchLogin(username, password) {
  const response = await fetch ('http://localhost:3000/api/auth/user-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  })

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
}

export function fetchSignup(username, password, email) {
  fetch('http://localhost:3000/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, email })
  })
    .then(response => {
      if (!response.ok) throw new Error(response.statusText);
    })
    .then(data => {
      console.log('Signup successful. Automatically logging in');
      return fetchLogin(username, password);
    })
    .catch(error => {
      console.log('Error:', error);
    })
}
