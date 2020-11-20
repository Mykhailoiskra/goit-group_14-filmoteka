import './sass/main.scss';
import './api-service.js';
import ApiService from './api-service.js';
import movieCards from './templates/movie-card.hbs';

const apiService = new ApiService;
const moviesList = document.querySelector('.home-list');

window.addEventListener('load', onLoad());

function onLoad() {
    apiService.fetchPopMovies().then((results) => makeMovieCardsMarkup(results));
}

function makeMovieCardsMarkup(results) {
    const markup = movieCards(results);
    moviesList.innerHTML = markup;
}

function clearMarkup() {
    moviesList.innerHTML = '';
}