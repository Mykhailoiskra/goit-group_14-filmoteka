import './sass/main.scss';
import ApiService from './api-service.js';

const apiService = new ApiService();
// const modalWindow = document.querySelector('[data-modal]');
// const paginationContainer = document.getElementsByClassName(
//   'pagination-buttons',
// )[0];
// import movieCards from './templates/movie-card.hbs';
import movieLibrary from './templates/movie-library.hbs'; 
import movieInfo from './templates/movie-info.hbs';
const modalWindow = document.querySelector('[data-modal]');


const refs = {
    btnWatched : document.querySelector('[data-action="watched"]'),
    btnQueue : document.querySelector('[data-action="queue"]'),
    moviesList : document.querySelector('.home-list'),    
}

window.addEventListener('load', onLoad());
refs.btnWatched.addEventListener('click', showWatched);
refs.btnQueue.addEventListener('click', showQueue);
refs.moviesList.addEventListener('click', onMovieClick);

let watchedArray = localStorage.getItem('WATCHED_KEY')
  ? JSON.parse(localStorage.getItem('WATCHED_KEY'))
  : [];
let queueArray = localStorage.getItem('QUEUE_KEY')
  ? JSON.parse(localStorage.getItem('QUEUE_KEY'))
    : [];

function onLoad(){
  showWatched();
}
function makeMovieCardsMarkup(results) {
  const markup = movieLibrary(results);
    refs.moviesList.innerHTML = markup;
  }

  function clearMarkup() {
    refs.moviesList.innerHTML = '';
  }

async function showWatched(){
    let watchedArray = localStorage.getItem('WATCHED_KEY')
  ? JSON.parse(localStorage.getItem('WATCHED_KEY'))
  : [];
  clearMarkup();
  let watchedMovies = [];
  for (let i = 0; i < watchedArray.length; i += 1){    
    await apiService.fetchMovieById(Number(watchedArray[i])).then(result => watchedMovies.push(result));
  }
  console.log(watchedMovies);
  makeMovieCardsMarkup(watchedMovies);
}

async function showQueue(){
  let queueArray = localStorage.getItem('QUEUE_KEY')
? JSON.parse(localStorage.getItem('QUEUE_KEY'))
: [];
clearMarkup();
let queueMovies = [];
for (let i = 0; i < queueArray.length; i += 1){
  await apiService.fetchMovieById(Number(queueArray[i])).then(result => queueMovies.push(result));
}
makeMovieCardsMarkup(queueMovies);
}

function onMovieClick(event) {
  if (event.target.nodeName !== 'IMG') {
     return
 }
 openModalWindow();

 renderMovieInfo(event.target.dataset.id);
 window.scrollTo({
top: 230,
left: 0,
behavior: 'smooth'
});
 
}

function openModalWindow() {
  modalWindow.classList.remove("visually-hidden");
  modalWindow.addEventListener('click', onOverlayClick);
  window.addEventListener("keydown", onKeysPress);  

}
function closeModalWindow() {
  modalWindow.classList.add("visually-hidden");
  modalWindow.removeEventListener('click', onOverlayClick);
  window.removeEventListener("keydown", onKeysPress);
  modalWindow.innerHTML = '';

  refs.btnAddToWatched.removeEventListener('click', addToWatched);
  refs.btnAddToQueue.removeEventListener('click', addToQueue);

}
function onOverlayClick(evt) {
if (evt.target === evt.currentTarget) {
  closeModalWindow();
  }
}

function onKeysPress(evt) {
  if (evt.code === "Escape") {
      closeModalWindow();
  }
}

async function renderMovieInfo(movieID) {
  // apiService.fetchMovieById(movieID).then((result) => {
  //     modalWindow.innerHTML = movieInfo(result);
  //     console.log(result);
  // })

  const response = await apiService.fetchMovieById(movieID);
  modalWindow.innerHTML = movieInfo(response); 

  const refs = {
    btnAddToWatched: document.querySelector('[data-action="add-to-watched"]'),
    btnAddToQueue: document.querySelector('[data-action="add-to-queue"]'),
      };
      
  
      refs.btnAddToWatched.addEventListener('click', addToWatched);
      refs.btnAddToQueue.addEventListener('click', addToQueue);
}



function addToWatched(e) {
  const filmName = e.currentTarget.dataset.id;
  const index = watchedArray.indexOf(filmName);

  if (index === -1){
    watchedArray.push(filmName);  
      //повесить добавлено
  }
  else{
    watchedArray.splice(index, 1);
    // повесить убрано
  }

  localStorage.setItem('WATCHED_KEY', JSON.stringify(watchedArray));
}
function addToQueue(e) {
  const filmName = e.currentTarget.dataset.id;
  const index = queueArray.indexOf(filmName);

  if (index === -1){
    queueArray.push(filmName); 
      //повесить добавлено
  }
  else{
    queueArray.splice(index, 1);
    // повесить убрано
  }

  localStorage.setItem('QUEUE_KEY', JSON.stringify(queueArray));
}

