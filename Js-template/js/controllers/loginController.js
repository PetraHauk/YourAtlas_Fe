import {fetchLogin, fetchSignup} from "../fetches/userFetches.js";

// -------- Login Logic ----------

export function logIn(username, password) {
  const errors = [];

  if (!username) errors.push("Username is required");
  if (!password) errors.push("Password is required");

  if (errors.length > 0) {
    alert(errors.join('\n'));
    return;
  }

  fetchLogin(username, password)
    .then(data => {
      console.log("Login successful");
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user_id", data.user.user_id);
      localStorage.setItem("username", data.user.username);
      window.location.href = "worlds.html";
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Login failed. Please check your credentials.");
    });
}

// -------- Sign Up Logic ----------

export function signUp(username, password, repeatPassword, email) {
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
}
