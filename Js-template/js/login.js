function fetchLogin(username, password) {
  fetch('http://localhost:3000/api/auth/user-login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  })
    .then(response => {
      if (!response.ok) throw new Error(response.statusText);
      return response.json();
    })
    .then(data => {
      console.log('Login successful');
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user_id', data.user.user_id);
      localStorage.setItem('username', data.user.username);
      // redirect only after successful login
      window.location.href = 'worlds.html';
    })
    .catch(error => {
      console.log('Error:', error);
      alert("Login failed. Please check your credentials.");
    });
}

function fetchSignup(username, password, email) {
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


document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.querySelector("#login-form");
  const registerForm = document.querySelector("#register");
  const forgotForm = document.querySelector("#forgot-password");

  const linkToRegister = document.querySelector("#link-to-register");
  const linkToLoginFromRegister = document.querySelector("#link-to-login-from-register");
  const linkToForgotPassword = document.querySelector("#link-to-forgot-password");
  const linkToLoginFromForgot = document.querySelector("#link-to-login-from-forgot");

  // Initial state
  loginForm.style.display = "block";
  registerForm.style.display = "none";
  forgotForm.style.display = "none";

  linkToRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    forgotForm.style.display = "none";
  });

  linkToLoginFromRegister.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    forgotForm.style.display = "none";
  });

  linkToForgotPassword.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "none";
    forgotForm.style.display = "block";
  });

  linkToLoginFromForgot.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    forgotForm.style.display = "none";
  });

  // ----------- Login -----------

  const loginUsername = document.querySelector("#username-login");
  const loginPassword = document.querySelector("#password-login");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = loginUsername.value.trim();
    const password = loginPassword.value;

    let errors = [];

    if (username === '' || username == null) {
      errors.push("Username is required");
    }

    if (password === '' || password == null) {
      errors.push("Password is required");
    }

    console.log('User:', username, password);

    if(errors.length > 0){
      console.log(errors);
      alert(errors.join('\n'));
      return;
    }

    fetchLogin(username, password);
  });

  // ----------- Register -----------

  const registerUsername = document.querySelector("#username-register");
  const registerPassword = document.querySelector("#password-register");
  const registerRepeatPassword = document.querySelector("#password-again-register");
  const registerEmail = document.querySelector("#email");

  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = registerUsername.value.trim();
    const password = registerPassword.value;
    const repeatPassword = registerRepeatPassword.value;
    const email = registerEmail.value.trim();

    let errors = [];

    if(username === '' || username == null){
      errors.push("Username is required");
    }

    if(username.length < 5){
      errors.push("Username should be at least 5 characters");
    }

    if(password === '' || password == null){
      errors.push("Password is required");
    }

    if(password !== repeatPassword){
      errors.push("Passwords do not match");
    }

    if(password.length < 8){
      errors.push("Password must be at least 8 characters long");
    }

    if(email === '' || email == null){
      errors.push("Email is required");
    }

    console.log('User:', username, password, email);

    if(errors.length > 0){
      console.log(errors);
      alert(errors.join('\n'));
      return;
    }

    fetchSignup(username, password, email);
  })

  // ----------- Forgot Password -----------

  const forgotPasswordForm = document.querySelector("#forgot-password");

  const forgotPasswordEmail = document.querySelector("#email-for-password");

  forgotPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
  })
});
