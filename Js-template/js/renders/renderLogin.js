import {logIn, signUp} from "../controllers/loginController.js";

export function renderLogin() {
  const loginForm = document.querySelector("#login-form");
  const registerForm = document.querySelector("#register");
  const forgotForm = document.querySelector("#forgot-password");

  const linkToRegister = document.querySelector("#link-to-register");
  const linkToLoginFromRegister = document.querySelector("#link-to-login-from-register");
  const linkToForgotPassword = document.querySelector("#link-to-forgot-password");
  const linkToLoginFromForgot = document.querySelector("#link-to-login-from-forgot");

  // Initial state (Login page)
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

    logIn(username, password);
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

    signUp(username, password, repeatPassword, email);
  })

  // ----------- Forgot Password -----------

  const forgotPasswordForm = document.querySelector("#forgot-password");

  const forgotPasswordEmail = document.querySelector("#email-for-password");

  forgotPasswordForm.addEventListener("submit", (e) => {
    e.preventDefault();
  })
}
