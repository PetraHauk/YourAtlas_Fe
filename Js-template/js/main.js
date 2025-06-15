function logout() {
  localStorage.clear();
  location.href="index.html";
}

document.addEventListener("DOMContentLoaded", function () {
  if (!window.location.pathname.endsWith('index.html')) {
    if (!localStorage.getItem('user_id')) {
      window.location.href = 'index.html';
    }
  }

  const logoutLink = document.querySelector("a.logout-link");

  if (logoutLink) {
    logoutLink.addEventListener("click", logout);
  }
})
