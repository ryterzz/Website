
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.documentElement.dataset.theme = "dark";
}

function updateThemeToggle() {
    const isDark = document.documentElement.dataset.theme === "dark";

    themeToggle.textContent = isDark ? "light mode" : "dark mode";
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    themeToggle.setAttribute("aria-pressed", isDark);

    document.querySelector('meta[name="theme-color"]').content = isDark ? "#171216" : "#fff8fa";
}

updateThemeToggle();

themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.dataset.theme === "dark";
    document.documentElement.dataset.theme = isDark ? "light" : "dark";
    localStorage.setItem("theme", isDark ? "light" : "dark");
    updateThemeToggle();
});