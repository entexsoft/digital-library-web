"use strict";

const root = document.documentElement;
const themeButton = document.querySelector("[data-theme-toggle]");
const themeKey = "digital-library-theme";

function applyTheme(theme) {
  root.dataset.theme = theme;
  themeButton.textContent = theme === "dark" ? "Use light theme" : "Use dark theme";
}

let theme = "dark";
try {
  if (localStorage.getItem(themeKey) === "light") theme = "light";
} catch {
  // The switch still works for the current page.
}
applyTheme(theme);
themeButton.addEventListener("click", () => {
  theme = theme === "dark" ? "light" : "dark";
  applyTheme(theme);
  try {
    localStorage.setItem(themeKey, theme);
  } catch {
    // Storage can be disabled by browser settings.
  }
});
themeButton.hidden = false;

const filter = document.querySelector("#category-filter");
if (filter) {
  const cards = document.querySelectorAll("[data-category]");
  const status = document.querySelector("#filter-status");
  filter.value = "";
  filter.addEventListener("change", () => {
    let count = 0;
    for (const card of cards) {
      card.hidden = filter.value !== "" && card.dataset.category !== filter.value;
      if (!card.hidden) count++;
    }
    status.textContent = count === 1 ? "1 publication shown." : count + " publications shown.";
  });
  filter.parentElement.hidden = false;
}
