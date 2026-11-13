// Gruppe: WI_25B_Gruppe_1

const statTotal = document.getElementById("stat-total");
const statMovies = document.getElementById("stat-movies");
const statSeries = document.getElementById("stat-series");
const statWatched = document.getElementById("stat-watched");
const statAverage = document.getElementById("stat-average");
const statFavoriteGenre = document.getElementById("stat-favorite-genre");

function countByType(watchlist, type) {
    let count = 0;

    for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i].type === type) {
            count++;
        }
    }

    return count;
}

function countWatched(watchlist) {
    let count = 0;

    for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i].watched) {
            count++;
        }
    }

    return count;
}

function getAverageRating(watchlist) {
    let sum = 0;
    let ratedCount = 0;

    for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i].rating !== null) {
            sum += watchlist[i].rating;
            ratedCount++;
        }
    }

    if (ratedCount === 0) {
        return null;
    }

    return sum / ratedCount;
}

function getFavoriteGenre(watchlist) {
    const ratedGenres = [];

    for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i].rating !== null && !ratedGenres.includes(watchlist[i].genre)) {
            ratedGenres.push(watchlist[i].genre);
        }
    }

    let favoriteGenre = null;
    let bestAverage = 0;

    for (let i = 0; i < ratedGenres.length; i++) {
        const genre = ratedGenres[i];

        const genreMovies = watchlist.filter(function (movie) {
            return movie.genre === genre;
        });

        const genreAverage = getAverageRating(genreMovies);

        // Bei Gleichstand bleibt das zuerst gefundene Genre
        if (genreAverage > bestAverage) {
            bestAverage = genreAverage;
            favoriteGenre = genre;
        }
    }

    return favoriteGenre;
}

function updateStatistics(watchlist = loadWatchlist()) {
    const average = getAverageRating(watchlist);
    const favoriteGenre = getFavoriteGenre(watchlist);

    statTotal.textContent = watchlist.length;
    statMovies.textContent = countByType(watchlist, "Film");
    statSeries.textContent = countByType(watchlist, "Serie");
    statWatched.textContent = countWatched(watchlist);

    if (average === null) {
        statAverage.textContent = "–";
    } else {
        statAverage.textContent = average.toFixed(1);
    }

    if (favoriteGenre === null) {
        statFavoriteGenre.textContent = "–";
    } else {
        statFavoriteGenre.textContent = favoriteGenre;
    }
}
