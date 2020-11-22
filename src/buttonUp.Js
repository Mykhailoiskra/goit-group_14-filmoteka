function upButtonHandler() {
  window.scrollTo({
    top: document.documentElement.offsetTop,
    behavior: 'smooth',
  });
}
let scroll = 0;
const btnUp = document.querySelector('.btnUp');
window.addEventListener('scroll', function (e) {
  scroll = window.scrollY;
  if (scroll > 0) {
    btnUp.classList.remove('visually-hidden');
  }
  if (scroll === 0) {
    btnUp.classList.add('visually-hidden');
  }
});

export default upButtonHandler;
