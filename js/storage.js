// Gruppe: WI_25B_Gruppe_1

function createMovieEntry(title, type, genre, episodes) {
    if (type === "Film") {
        episodes = 1;
    }

    return {
        id: Date.now(),
        title: title,
        type: type,
        genre: genre,
        episodes: episodes,
        watchedEpisodes: 0,
        watched: false,
        rating: null
    };
}

function saveWatchlist(watchlist) {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
}

function addMovieEntry(movie) {
    const watchlist = loadWatchlist();
    watchlist.push(movie);
    saveWatchlist(watchlist);
}
