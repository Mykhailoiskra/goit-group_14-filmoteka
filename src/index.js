import './sass/main.scss';
import './api-service.js';
import ApiService from './api-service.js';
import movieCards from './templates/movie-card.hbs';

const apiService = new ApiService;
const moviesList = document.querySelector('.home-list');

window.addEventListener('load', onLoad());

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
}

