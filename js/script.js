// Gruppe: WI_25B_Gruppe_1

const randomButton = document.getElementById("random-button");
const randomResult = document.getElementById("random-result");

function loadWatchlist() {
    const savedList = localStorage.getItem("watchlist");

    if (savedList === null) {
        return [];
    }

    try {
        return JSON.parse(savedList);
    } catch (error) {
        console.error("Watchlist konnte nicht geladen werden:", error.message);
        return [];
    }
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

function getUnwatchedMovies(watchlist) {
    return watchlist.filter(function (movie) {
        return !movie.watched;
    });
}

function showRandomPick() {
    const watchlist = loadWatchlist();

    if (watchlist.length === 0) {
        randomResult.textContent = "Eure Watchlist ist noch leer. Fügt zuerst einen Titel hinzu.";
        return;
    }

    const unwatchedMovies = getUnwatchedMovies(watchlist);

    if (unwatchedMovies.length === 0) {
        randomResult.textContent = "Ihr habt schon alles geschaut! Fügt neue Titel hinzu.";
        return;
    }

    const randomIndex = getRandomNumber(unwatchedMovies.length);
    const pickedMovie = unwatchedMovies[randomIndex];

    randomResult.textContent = `Heute schaut ihr: ${pickedMovie.title} (${pickedMovie.type}, ${pickedMovie.genre})`;
}

randomButton.addEventListener("click", showRandomPick);