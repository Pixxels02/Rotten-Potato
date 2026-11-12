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

        const ratingField = document.createElement("div");
        ratingField.className = "rating-field";

        const ratingLabel = document.createElement("label");
        ratingLabel.className = "rating-label";

        const ratingText = document.createElement("span");
        ratingText.innerText = "Bewertung";

        const ratingInput = document.createElement("input");
        ratingInput.type = "number";
        ratingInput.min = "1";
        ratingInput.max = "10";
        ratingInput.placeholder = "1-10";

        if (movie.rating !== null) {
            ratingInput.value = movie.rating;
        }

        ratingLabel.appendChild(ratingText);
        ratingLabel.appendChild(ratingInput);

        const ratingButton = document.createElement("button");
        ratingButton.type = "button";
        ratingButton.className = "rating-button";
        ratingButton.innerText = "Speichern";

        const ratingMessage = document.createElement("p");
        ratingMessage.className = "rating-message";

        ratingButton.addEventListener("click", function () {
            saveRating(movie.id, ratingInput.value, ratingMessage);
        });

        ratingField.appendChild(ratingLabel);
        ratingField.appendChild(ratingButton);

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
        card.appendChild(ratingField);
        card.appendChild(ratingMessage);
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

function saveRating(id, value, message) {
    const rating = Number(value);

    if (value === "" || rating < 1 || rating > 10 || rating % 1 !== 0) {
        message.innerText = "Bitte eine ganze Zahl von 1 bis 10 eingeben.";
        return;
    }

    const watchlist = loadWatchlist();

    for (let i = 0; i < watchlist.length; i++) {
        if (watchlist[i].id === id) {
            watchlist[i].rating = rating;
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