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

function findMovieById(id) {
    const watchlist = loadWatchlist();

    for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i].id === id) {
            return watchlist[i];
        }
    }

    return null;
}

function updateMovieEntry(id, title, type, genre, episodes) {
    const watchlist = loadWatchlist();

    for (let i = 0; i < watchlist.length; i++) {
        const movie = watchlist[i];

        if (movie.id === id) {
            movie.title = title;
            movie.type = type;
            movie.genre = genre;
            movie.episodes = episodes;

            if (type === "Film") {
                movie.episodes = 1;
            }

            if (movie.watchedEpisodes > movie.episodes) {
                movie.watchedEpisodes = movie.episodes;
            }
        }
    }

    saveWatchlist(watchlist);
}
