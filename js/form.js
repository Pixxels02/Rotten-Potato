// Gruppe: WI_25B_Gruppe_1

const movieForm = document.getElementById("movie-form");
const titleInput = document.getElementById("title-input");
const typeSelect = document.getElementById("type-select");
const genreInput = document.getElementById("genre-input");
const episodesField = document.getElementById("episodes-field");
const episodesInput = document.getElementById("episodes-input");
const formMessage = document.getElementById("form-message");

function toggleEpisodesField() {
    if (typeSelect.value === "Serie") {
        episodesField.classList.remove("hidden");
    } else {
        episodesField.classList.add("hidden");
    }
}

function validateForm(title, type, genre, episodes) {
    if (title === "" || genre === "") {
        return false;
    }

    if (type === "Serie" && (!Number.isInteger(episodes) || episodes < 1)) {
        return false;
    }

    return true;
}

function resetMovieForm() {
    movieForm.reset();
    toggleEpisodesField();
}

function refreshMovieList() {
    // applyFilters() kommt von Jannick (filter.js)
    if (typeof applyFilters === "function") {
        applyFilters();
    }
}

function handleFormSubmit(event) {
    event.preventDefault();

    const title = titleInput.value.trim();
    const type = typeSelect.value;
    const genre = genreInput.value.trim();
    const episodes = Number(episodesInput.value);

    if (!validateForm(title, type, genre, episodes)) {
        formMessage.textContent = "Bitte füllt alle Pflichtfelder aus.";
        return;
    }

    const newMovie = createMovieEntry(title, type, genre, episodes);
    addMovieEntry(newMovie);

    resetMovieForm();
    refreshMovieList();
    formMessage.textContent = title + " wurde zu eurer Watchlist hinzugefügt.";
}

movieForm.addEventListener("submit", handleFormSubmit);
typeSelect.addEventListener("change", toggleEpisodesField);
