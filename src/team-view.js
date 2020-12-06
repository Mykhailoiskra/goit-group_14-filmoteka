export default function teamViewer(event) {
  const footerLinkRef = document.querySelector('.footer-link');
  // console.log(footerLinkRef);
  footerLinkRef.addEventListener('click', teamView);
  //   event.preventDefault();
  modalWindow.innerHTML = teamView(team);
  console.log(team);
  openModalWindow();
}
import teamViewTpl from './templates/team-view.hbs';

const team = [
  {
    name: 'Alexandr',
    email: 'djalexbc@gmail.com',
    img: 'https://ca.slack-edge.com/T017KJVP6TB-U017C9USLN9-e53bd08b3c38-512',
  },
  {
    name: 'Alexandr Tsotsko',
    email: 'alex.tsotsko21@gmail.com',
    img: 'https://ca.slack-edge.com/T017KJVP6TB-U017E38LJ12-5013354fa832-512',
  },
  {
    name: 'Dmytro Iarkovenko',
    email: 'iarkovenko.dmytro@gmail.com',
    img: 'https://ca.slack-edge.com/T017KJVP6TB-U017X9ZUK40-2a8835b23e92-512',
  },
  {
    name: 'Mykhailo Iskra',
    email: 'iskramichel@gmail.com',
    img: 'https://ca.slack-edge.com/T017KJVP6TB-U01781WDMJ7-a58540524ae0-512',
  },
  {
    name: 'Oleksandr Kolo',
    email: 'enterbook88@gmail.com',
    img: 'https://ca.slack-edge.com/T017KJVP6TB-U017JQGLHCL-c19d0369ea1b-512',
  },
  {
    name: 'Oleksandr Naichenko',
    email: 'c.gaze145@gmail.com',
    img: 'https://ca.slack-edge.com/T017KJVP6TB-U017C0HF943-2d399add031b-512',
  },
  {
    name: 'Yurii',
    email: 'yuriioleksandrovichkonoval@gmail.com',
    img: 'https://ca.slack-edge.com/T017KJVP6TB-U0178BF42D9-7b593da9da51-512',
  },
  {
    name: 'Даниил',
    email: 'daniilgolyachenko@gmail.com',
    img: 'https://ca.slack-edge.com/T017KJVP6TB-U017J6JKQ3E-f784942e7384-512',
  },
];
