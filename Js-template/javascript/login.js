document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.querySelector("#form-login");
  const registerForm = document.querySelector("#form-register");
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
});
