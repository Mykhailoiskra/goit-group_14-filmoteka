import "./sass/main.scss";


// Необходимо повесить дата атрибут data-action="add-to-watched" на одноименную кнопку фильма,
// data-action="add-to-queue" на одноименную кнопку фильма.
// на эти же кнопки необходимо записывать в data-id - id открытого фильма
const refs = {btnAddToWatched : document.querySelector('[data-action="add-to-watched"]'),
btnAddToQueue : document.querySelector('[data-action="add-to-queue"]')};

// слушатели добавлять при открытии большой карточки фильма и снимать при закрытии
// при нажимании на любую из этих кнопок она далжна становиться неактивной
refs.btnAddToWatched.addEventListener('click', addToWatched);
refs.btnAddToQueue.addEventListener('click', addToQueue);


let watchedArray = localStorage.getItem('WATCHED_KEY') ? JSON.parse(localStorage.getItem('WATCHED_KEY')) : [];
let queueArray = localStorage.getItem('QUEUE_KEY') ? JSON.parse(localStorage.getItem('QUEUE_KEY')) : [];

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
    
    localStorage.setItem('QUEUE_KEY', JSON.stringify(`${queueArray}`));
}

