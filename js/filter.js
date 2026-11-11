// Gruppe: WI_25B_Gruppe_1

const filterTypeSelect = document.getElementById("filter-type");
const filterStatusSelect = document.getElementById("filter-status");
const filterGenreSelect = document.getElementById("filter-genre");
const searchInput = document.getElementById("search-input");
const sortSelect = document.getElementById("sort-select");

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

function filterBySearch(watchlist, searchText) {
    const search = searchText.trim().toLowerCase();

    if (search === "") {
        return watchlist;
    }

    return watchlist.filter(function (movie) {
        return movie.title.toLowerCase().includes(search);
    });
}

function sortMovies(watchlist, sortOption) {
    const sortedMovies = watchlist.slice();

    sortedMovies.sort(function (a, b) {
        if (sortOption === "title-asc") {
            return a.title.localeCompare(b.title);
        }

        if (sortOption === "title-desc") {
            return b.title.localeCompare(a.title);
        }

        // Titel ohne Bewertung kommen immer ans Ende
        if (a.rating === null && b.rating === null) {
            return 0;
        }

        if (a.rating === null) {
            return 1;
        }

        if (b.rating === null) {
            return -1;
        }

        if (sortOption === "rating-desc") {
            return b.rating - a.rating;
        }

        return a.rating - b.rating;
    });

    return sortedMovies;
}

function applyFilters() {
    const watchlist = loadWatchlist();

    populateGenreOptions(watchlist);

    let visibleMovies = filterByType(watchlist, filterTypeSelect.value);
    visibleMovies = filterByStatus(visibleMovies, filterStatusSelect.value);
    visibleMovies = filterByGenre(visibleMovies, filterGenreSelect.value);
    visibleMovies = filterBySearch(visibleMovies, searchInput.value);
    visibleMovies = sortMovies(visibleMovies, sortSelect.value);

    renderMovieCards(visibleMovies);
}

filterTypeSelect.addEventListener("change", applyFilters);
filterStatusSelect.addEventListener("change", applyFilters);
filterGenreSelect.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);
sortSelect.addEventListener("change", applyFilters);

applyFilters();
