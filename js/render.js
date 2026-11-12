// Gruppe: WI_25B_Gruppe_1

const movieList = document.getElementById("movie-list");

function renderMovieCards(watchlist = loadWatchlist()) {
    movieList.innerHTML = "";

    for (let i = 0; i < watchlist.length; i++) {
        const movie = watchlist[i];

        const card = document.createElement("li");
        card.className = "movie-card";

        if (movie.watched) {
            card.className = "movie-card watched-card";
        }

        const title = document.createElement("h3");
        title.innerText = movie.title;

        const info = document.createElement("p");
        info.className = "movie-info";
        info.innerText = `${movie.type} | ${movie.genre}`;

        const watchedLabel = document.createElement("label");
        watchedLabel.className = "watched-label";

        const watchedCheckbox = document.createElement("input");
        watchedCheckbox.type = "checkbox";
        watchedCheckbox.checked = movie.watched;
        watchedCheckbox.addEventListener("click", function () {
            toggleWatched(movie.id);
        });

        const watchedText = document.createElement("span");
        watchedText.innerText = "Geschaut";

        watchedLabel.appendChild(watchedCheckbox);
        watchedLabel.appendChild(watchedText);

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.innerText = "Löschen";
        deleteButton.addEventListener("click", function () {
            deleteMovieEntry(movie.id);
        });

        card.appendChild(title);
        card.appendChild(info);
        card.appendChild(watchedLabel);
        card.appendChild(deleteButton);
        movieList.appendChild(card);
    }
}

function toggleWatched(id) {
    const watchlist = loadWatchlist();

    for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i].id === id) {
            watchlist[i].watched = !watchlist[i].watched;
        }
    }

    saveWatchlist(watchlist);
    applyFilters();
}

function deleteMovieEntry(id) {
    const watchlist = loadWatchlist();
    const newWatchlist = [];

    for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i].id !== id) {
            newWatchlist.push(watchlist[i]);
        }
    }

    saveWatchlist(newWatchlist);
    applyFilters();
}

renderMovieCards();