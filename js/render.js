// Gruppe: WI_25B_Gruppe_1

const movieList = document.getElementById("movie-list");

function renderMovieCards(watchlist = loadWatchlist()) {
    movieList.innerHTML = "";

    for (let i = 0; i < watchlist.length; i++) {
        const movie = watchlist[i];

        const card = document.createElement("li");
        card.className = "movie-card";

        const title = document.createElement("h3");
        title.innerText = movie.title;

        const info = document.createElement("p");
        info.innerText = `${movie.type} | ${movie.genre}`;

        card.appendChild(title);
        card.appendChild(info);
        movieList.appendChild(card);
    }
}

renderMovieCards();