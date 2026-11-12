// Gruppe: WI_25B_Gruppe_1

function refreshMovieList() {
    // applyFilters() aus filter.js filtert, sortiert und rendert die Liste neu
    applyFilters();
}

function initApp() {
    movieForm.addEventListener("submit", handleFormSubmit);
    typeSelect.addEventListener("change", toggleEpisodesField);
    cancelButton.addEventListener("click", resetMovieForm);
}

initApp();
