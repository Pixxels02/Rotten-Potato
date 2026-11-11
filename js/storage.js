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
