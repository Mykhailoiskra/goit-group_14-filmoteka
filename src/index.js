import './sass/main.scss';
import './api-service.js';
import ApiService from './api-service.js';
import movieCards from './templates/movie-card.hbs';

const apiService = new ApiService;
const moviesList = document.querySelector('.home-list');
/ Необходимо повесить дата атрибут data-action="add-to-watched" на одноименную кнопку фильма,
// data-action="add-to-queue" на одноименную кнопку фильма.
// на эти же кнопки необходимо записывать в data-id - id открытого фильма
const refs = {btnAddToWatched : document.querySelector('[data-action="add-to-watched"]'),
btnAddToQueue : document.querySelector('[data-action="add-to-queue"]')};
let watchedArray = localStorage.getItem('WATCHED_KEY') ? JSON.parse(localStorage.getItem('WATCHED_KEY')) : [];
let queueArray = localStorage.getItem('QUEUE_KEY') ? JSON.parse(localStorage.getItem('QUEUE_KEY')) : [];


window.addEventListener('load', onLoad());

/
// слушатели добавлять при открытии большой карточки фильма и снимать при закрытии
// при нажимании на любую из этих кнопок она далжна становиться неактивной
refs.btnAddToWatched.addEventListener('click', addToWatched);
refs.btnAddToQueue.addEventListener('click', addToQueue);

function onLoad() {
    // apiService.fetchPopMovies().then((results) => makeMovieCardsMarkup(results));
    Promise.all([apiService.fetchPopMovies(), apiService.fetchGenres()]).then(
        ([movies, genres]) => {
            const formatedMoviesWithGenreNames = renderGenres(genres, movies);
            return formatedMoviesWithGenreNames;
        }
    ).then(results => makeMovieCardsMarkup(results));
      
}

function makeMovieCardsMarkup(results) {
    const markup = movieCards(results);
    moviesList.innerHTML = markup;
}

function clearMarkup() {
    moviesList.innerHTML = '';
}



function renderGenres(genres, movies) {
  return movies.map(({ genre_ids, ...otherProps }) => {
    const genre_names = genre_ids.map((genreId) => {
      const { name } = genres.find(({ id }) => id === genreId);
      return name;
    });
    return { ...otherProps, genre_names };
  });
  function addToWatched(e){
    const filmName = e.currentTarget.dataset.id;

     watchedArray = [watchedArray];
    watchedArray.push(`${filmName}`);
    
    localStorage.setItem('WATCHED_KEY', JSON.stringify(`${watchedArray}`));
}
function addToQueue(e){
    const filmName = e.currentTarget.dataset.id;
    
    queueArray = [queueArray];
    queueArray.push(`${filmName}`);
    
    localStorage.setItem('QUEUE_KEY', JSON.stringify(`${queueArray}`));}


