// Function to print the username for the heading
export function printUsername () {
  const heading = document.querySelector(".your-username");;
  const username = localStorage.getItem("username");
  heading.innerHTML = `${username}`;
}
