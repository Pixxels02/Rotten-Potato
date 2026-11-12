// Gruppe: WI_25B_Gruppe_1

const movieForm = document.getElementById("movie-form");
const titleInput = document.getElementById("title-input");
const typeSelect = document.getElementById("type-select");
const genreInput = document.getElementById("genre-input");
const episodesField = document.getElementById("episodes-field");
const episodesInput = document.getElementById("episodes-input");
const formMessage = document.getElementById("form-message");
const titleError = document.getElementById("title-error");
const genreError = document.getElementById("genre-error");
const episodesError = document.getElementById("episodes-error");

function toggleEpisodesField() {
    if (typeSelect.value === "Serie") {
        episodesField.classList.remove("hidden");
    } else {
        episodesField.classList.add("hidden");
    }
}

function showError(input, errorElement, message) {
    input.classList.add("input-error");
    errorElement.textContent = message;
}

function clearErrors() {
    titleInput.classList.remove("input-error");
    genreInput.classList.remove("input-error");
    episodesInput.classList.remove("input-error");
    titleError.textContent = "";
    genreError.textContent = "";
    episodesError.textContent = "";
}

function isDuplicateTitle(title, type) {
    const watchlist = loadWatchlist();

    for (let i = 0; i < watchlist.length; i++) {
        const movie = watchlist[i];

        if (movie.title.toLowerCase() === title.toLowerCase() && movie.type === type) {
            return true;
        }
    }

    return false;
}

function validateForm(title, type, genre, episodes) {
    let isValid = true;
    clearErrors();

    if (title === "") {
        showError(titleInput, titleError, "Bitte gebt einen Titel ein.");
        isValid = false;
    } else if (isDuplicateTitle(title, type)) {
        showError(titleInput, titleError, title + " steht schon auf eurer Watchlist.");
        isValid = false;
    }

    if (genre === "") {
        showError(genreInput, genreError, "Bitte gebt ein Genre ein.");
        isValid = false;
    }

    if (type === "Serie" && (episodes < 1 || episodes % 1 !== 0)) {
        showError(episodesInput, episodesError, "Die Anzahl der Folgen muss eine ganze Zahl ab 1 sein.");
        isValid = false;
    }

    return isValid;
}

function resetMovieForm() {
    movieForm.reset();
    clearErrors();
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
        formMessage.textContent = "Bitte korrigiert die markierten Felder.";
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
