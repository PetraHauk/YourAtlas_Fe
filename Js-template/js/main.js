function logout() {
  localStorage.clear();
  location.href="index.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const logoutLink = document.querySelector("a.logout-link");

  if (logoutLink) {
    logoutLink.addEventListener("click", logout);
  }
})
