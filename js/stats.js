// Gruppe: WI_25B_Gruppe_1

const statTotal = document.getElementById("stat-total");
const statMovies = document.getElementById("stat-movies");
const statSeries = document.getElementById("stat-series");
const statWatched = document.getElementById("stat-watched");
const statAverage = document.getElementById("stat-average");

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

function updateStatistics(watchlist = loadWatchlist()) {
    const average = getAverageRating(watchlist);

    statTotal.textContent = watchlist.length;
    statMovies.textContent = countByType(watchlist, "Film");
    statSeries.textContent = countByType(watchlist, "Serie");
    statWatched.textContent = countWatched(watchlist);

    if (average === null) {
        statAverage.textContent = "–";
    } else {
        statAverage.textContent = average.toFixed(1);
    }
}
