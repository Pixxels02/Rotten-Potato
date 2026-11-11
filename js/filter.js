// Gruppe: WI_25B_Gruppe_1

const filterTypeSelect = document.getElementById("filter-type");
const filterStatusSelect = document.getElementById("filter-status");

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

function applyFilters() {
    const watchlist = loadWatchlist();

    let visibleMovies = filterByType(watchlist, filterTypeSelect.value);
    visibleMovies = filterByStatus(visibleMovies, filterStatusSelect.value);

    renderMovieCards(visibleMovies);
}

filterTypeSelect.addEventListener("change", applyFilters);
filterStatusSelect.addEventListener("change", applyFilters);
