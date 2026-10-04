
const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("theme");
const prefersDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (savedTheme === "dark" || (!savedTheme && prefersDarkTheme)) {
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

const gameSearch = document.querySelector("#game-search-input");

if (gameSearch) {
    const games = [...document.querySelectorAll(".game")];
    const gameCount = document.querySelector("#game-search-count");

    gameSearch.addEventListener("input", () => {
        const searchTerm = gameSearch.value.trim().toLowerCase();
        let visibleGames = 0;

        games.forEach((game) => {
            const matches = game.textContent.toLowerCase().includes(searchTerm);
            game.hidden = !matches;
            visibleGames += Number(matches);
        });

        gameCount.textContent = visibleGames === 0
            ? "no games found"
            : `${visibleGames} ${visibleGames === 1 ? "game" : "games"}`;
    });
}

const genreButtons = [...document.querySelectorAll("[data-genre-filter]")];

if (genreButtons.length > 0) {
    const genres = [...document.querySelectorAll("[data-genre]")];
    const genreCount = document.querySelector("#genre-count");

    genreButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedGenre = button.dataset.genreFilter;
            let visibleGenres = 0;

            genreButtons.forEach((filterButton) => {
                filterButton.setAttribute("aria-pressed", filterButton === button);
            });

            genres.forEach((genre) => {
                const matches = selectedGenre === "all" || genre.dataset.genre === selectedGenre;
                genre.hidden = !matches;
                visibleGenres += Number(matches);
            });

            genreCount.textContent = `${visibleGenres} ${visibleGenres === 1 ? "genre" : "genres"}`;
        });
    });
}

const localTime = document.querySelector("#local-time");

if (localTime) {
    const updateLocalTime = () => {
        const now = new Date();

        localTime.dateTime = now.toISOString();
        localTime.textContent = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            timeZone: "America/Chicago"
        }).format(now);
    };

    updateLocalTime();
    setInterval(updateLocalTime, 30_000);
}

const readingProgress = document.createElement("div");
readingProgress.className = "reading-progress";
readingProgress.setAttribute("aria-hidden", "true");
document.body.prepend(readingProgress);

let progressUpdateQueued = false;

function updateReadingProgress() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

    readingProgress.style.transform = `scaleX(${Math.min(progress, 1)})`;
    progressUpdateQueued = false;
}

window.addEventListener("scroll", () => {
    if (!progressUpdateQueued) {
        progressUpdateQueued = true;
        window.requestAnimationFrame(updateReadingProgress);
    }
}, { passive: true });

window.addEventListener("resize", updateReadingProgress);
updateReadingProgress();

const backToTop = document.createElement("button");
backToTop.className = "back-to-top";
backToTop.type = "button";
backToTop.setAttribute("aria-label", "Back to top");
backToTop.textContent = "↑";
backToTop.hidden = true;
document.body.append(backToTop);

function updateBackToTop() {
    backToTop.hidden = window.scrollY < 400;
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
    });
});