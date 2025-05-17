document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.querySelector("#login");
  const registerForm = document.querySelector("#register");

  const loadRegisterForm = document.querySelector("#switch-to-register");
  const loadLoginForm = document.querySelector("#switch-to-login");

  loginForm.style.display = "block";
  registerForm.style.display = "none";

  loadRegisterForm.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  })

  loadLoginForm.addEventListener("click", (e) => {
    e.preventDefault();
    loginForm.style.display = "block";
    registerForm.style.display = "none";
  })

})

