import './sass/main.scss';
import './api-service.js';
import ApiService from './api-service.js';

const apiService = new ApiService;
console.log(apiService.fetchMoviesByKeyWords('dog'));