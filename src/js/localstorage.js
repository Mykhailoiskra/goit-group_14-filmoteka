
const refs = {btnWatched : document.querySelector('[data-action="watched"]'),
btnQueue : document.querySelector('[data-action="queue"]')};


refs.btnWatched.addEventListener('click', markWatched);
refs.btnQueue.addEventListener('click', addToQueue);


const FILMS_QUEUE = '';

let watchedArray = localStorage.getItem('WATCHED_KEY') ? JSON.parse(localStorage.getItem('WATCHED_KEY')) : [];

console.log(watchedArray);
// fetch('https://api.themoviedb.org/3/movie/566574?api_key=ddf4c37c511f1a6f73099f52175f3c51&language=en-US')
//         .then(response => response.json())
//         .then(data => console.log(data));


function markWatched(e){
    const filmName = e.currentTarget.dataset.id;
    // console.log(filmName);
    // if(!(watchedArray instanceof Array))
    watchedArray = [watchedArray];
    watchedArray.push(`${filmName}`);
    
    localStorage.setItem('WATCHED_KEY', JSON.stringify(`${watchedArray}`));
}
function addToQueue(e){
    const filmName = e.currentTarget.dataset.id;
    console.log(filmName);
}