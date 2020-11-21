
// !! Увага, API не дозволяє встановлювати значення per-page !!

//      FT-07 Реализовать подгрузку популярных фильмов на главную (первую) страницу
// apiService.fetchPopMovies() Повертає масив 20 об'єктів фільмів з розділу "Популярні"

//      FT-10 Реализовать поиск и отрисовку фильмов по ключевому слову
// apiService.fetchMoviesByKeyWords() Приймає keyString з ключовими словами, повертає масив <= 20 об'єктів фільмів.
// при невірному вводі, повертається пустий масив '[]'.

class ApiService {
  constructor() {
    this.API_KEY = 'ddf4c37c511f1a6f73099f52175f3c51';
    this.searchQuery = '';
    this.queryPage = 1;
    // this.perPage = 20 (fixed by API)//
    this.URL = 'https://api.themoviedb.org/3';
    this.options = {
      contentType: 'application/json',
    };
  }
  fetchPopMovies() {
    return fetch(
      `${this.URL}/movie/popular?api_key=${this.API_KEY}&language=uk-UA&page=${this.queryPage}`,
      this.options,
    )
      .then(r => this.checkResponse(r))
      .then(({ results }) => results);
  }
  fetchMoviesByKeyWords(keyWords) {
    this.setSearchQuery(keyWords);
    return fetch(
      `${this.URL}/search/movie?api_key=${this.API_KEY}&query=${this.searchQuery}&page=${this.queryPag}`,
      this.options,
    )
      .then(r => r.json())
      .then(({ results }) => results);
  }

  fetchGenres() {
    return fetch(`${this.URL}/genre/movie/list?api_key=${this.API_KEY}&language=en-US`).then(r => r.json()).then(({ genres }) => genres);
  }
  setSearchQuery(keyString) {
    this.searchQuery = keyString.toLowerCase().split(' ').join('+');
  }
  checkResponse(r) {
    if (r.status === 200) {
      return r.json();
    } else {
      console.error('error');
    }
  }
}


export default ApiService;
