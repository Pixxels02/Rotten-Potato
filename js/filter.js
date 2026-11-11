// Gruppe: WI_25B_Gruppe_1

const filterTypeSelect = document.getElementById("filter-type");
const filterStatusSelect = document.getElementById("filter-status");
const filterGenreSelect = document.getElementById("filter-genre");

function getUniqueGenres(watchlist) {
    const genres = [];

    for (let i = 0; i < watchlist.length; i++) {
        if (!genres.includes(watchlist[i].genre)) {
            genres.push(watchlist[i].genre);
        }
    }

    return genres.sort();
}

function createGenreOption(value, label) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    return option;
}

function populateGenreOptions(watchlist) {
    const selectedGenre = filterGenreSelect.value;
    const genres = getUniqueGenres(watchlist);

    filterGenreSelect.textContent = "";
    filterGenreSelect.appendChild(createGenreOption("alle", "Alle"));

    for (let i = 0; i < genres.length; i++) {
        filterGenreSelect.appendChild(createGenreOption(genres[i], genres[i]));
    }

    if (genres.includes(selectedGenre)) {
        filterGenreSelect.value = selectedGenre;
    }
}

function filterByType(watchlist, type) {
    if (type === "alle") {
        return watchlist;
    }

    return watchlist.filter(function (movie) {
        return movie.type === type;
    });
}

function filterByStatus(watchlist, status) {
    if (status === "alle") {
        return watchlist;
    }

    return watchlist.filter(function (movie) {
        if (status === "geschaut") {
            return movie.watched;
        }

        return !movie.watched;
    });
}

function filterByGenre(watchlist, genre) {
    if (genre === "alle") {
        return watchlist;
    }

    return watchlist.filter(function (movie) {
        return movie.genre === genre;
    });
}

function applyFilters() {
    const watchlist = loadWatchlist();

    populateGenreOptions(watchlist);

    let visibleMovies = filterByType(watchlist, filterTypeSelect.value);
    visibleMovies = filterByStatus(visibleMovies, filterStatusSelect.value);
    visibleMovies = filterByGenre(visibleMovies, filterGenreSelect.value);

    renderMovieCards(visibleMovies);
}

filterTypeSelect.addEventListener("change", applyFilters);
filterStatusSelect.addEventListener("change", applyFilters);
filterGenreSelect.addEventListener("change", applyFilters);

populateGenreOptions(loadWatchlist());
