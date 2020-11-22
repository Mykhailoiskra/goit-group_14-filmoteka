import './sass/main.scss';
import ApiService from './api-service.js';

const apiService = new ApiService();
// const modalWindow = document.querySelector('[data-modal]');
// const paginationContainer = document.getElementsByClassName(
//   'pagination-buttons',
// )[0];
import movieCards from './templates/movie-card-by-id.hbs';

let watchedMovies = [];

const refs = {
  btnWatched: document.querySelector('[data-action="watched"]'),
  btnQueue: document.querySelector('[data-action="queue"]'),
  moviesList: document.querySelector('.home-list'),
};

refs.btnWatched.addEventListener('click', showWatched);
// refs.btnQueue.addEventListener('click', showQueue);

function makeMovieCardsMarkup(results) {
  const markup = movieCards(results);
  refs.moviesList.innerHTML = markup;
}

async function showWatched() {
  let watchedArray = localStorage.getItem('WATCHED_KEY')
    ? JSON.parse(localStorage.getItem('WATCHED_KEY'))
    : [];

  for (let i = 0; i < watchedArray.length; i += 1) {
    await apiService
      .fetchMovieById(Number(watchedArray[i]))
      .then(result => watchedMovies.push(result));
  }
  console.log(watchedMovies);
  makeMovieCardsMarkup(watchedMovies);
}
