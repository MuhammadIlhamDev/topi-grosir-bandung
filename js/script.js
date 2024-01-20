const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

// klik diluar sidebar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// search-form
const searchForm = document.querySelector(".search-form");
const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-button");

document.getElementById("search-button").onclick = () => {
  searchForm.classList.toggle("actived");
  searchBox.focus();
};

// Tambahkan event listener untuk menyembunyikan formulir ketika klik di luar formulir
document.addEventListener("click", (event) => {
  if (!searchButton.contains(event.target) && !searchForm.contains(event.target)) {
    searchForm.classList.remove("actived");
  }
});
